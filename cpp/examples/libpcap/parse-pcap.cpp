// To Run: g++ parse-pcap.cpp -o parse-pcap --std=c++17 -lpcap; ./parse-pcap

#include <iostream>
#include <pcap.h>
#include <net/ethernet.h>

/************************* Global Variables **************************/

const char *filename = "./pcap/TIPC-over-TCP_MTU-discovery.pcap";
const char *filter = "tcp";

int numPackets = 0;

/************************ TCP / IP Definitions ************************/

// ETHERNET

#define ETHER_ADDR_LEN 6 /* ethernet addresses are 6 bytes */

struct ethernet_header {
    u_char ether_dhost[ETHER_ADDR_LEN]; /* Destination host address */
	u_char ether_shost[ETHER_ADDR_LEN]; /* Source host address */
	u_short ether_type;                 /* IP? ARP? RARP? etc. */
};

// IP

struct ip_header {
    u_char ip_vhl;		/* version << 4 | header length >> 2 */
	u_char ip_tos;		/* type of service */
	u_short ip_len;		/* total length */
	u_short ip_id;		/* identification */
	u_short ip_off;		/* fragment offset field */
    #define IP_RF 0x8000		/* reserved fragment flag */
    #define IP_DF 0x4000		/* don't fragment flag */
    #define IP_MF 0x2000		/* more fragments flag */
    #define IP_OFFMASK 0x1fff	/* mask for fragmenting bits */
	u_char ip_ttl;		/* time to live */
	u_char ip_p;		/* protocol */
	u_short ip_sum;		/* checksum */
	struct in_addr ip_src,ip_dst; /* source and dest address */
};
#define IP_HL(ip)		(((ip)->ip_vhl) & 0x0f)
#define IP_V(ip)		(((ip)->ip_vhl) >> 4)

// TCP

typedef u_int tcp_seq;

struct tcp_header {
    u_short th_sport;	/* source port */
	u_short th_dport;	/* destination port */
	tcp_seq th_seq;		/* sequence number */
	tcp_seq th_ack;		/* acknowledgement number */
	u_char th_offx2;	/* data offset, rsvd */
    #define TH_OFF(th)	(((th)->th_offx2 & 0xf0) > 4)
	u_char th_flags;
    #define TH_FIN 0x01
    #define TH_SYN 0x02
    #define TH_RST 0x04
    #define TH_PUSH 0x08
    #define TH_ACK 0x10
    #define TH_URG 0x20
    #define TH_ECE 0x40
    #define TH_CWR 0x80
    #define TH_FLAGS (TH_FIN|TH_SYN|TH_RST|TH_ACK|TH_URG|TH_ECE|TH_CWR)
	u_short th_win;		/* window */
	u_short th_sum;		/* checksum */
	u_short th_urp;		/* urgent pointer */
};

/*************************** Main Functions ***************************/

void process_packet(u_char *args, const struct pcap_pkthdr *header, const u_char *packet) {
    const struct ethernet_header *ethernetHeader;  /* The ethernet header */
	const struct ip_header *ipHeader;              /* The IP header */
	const struct tcp_header *tcpHeader;            /* The TCP header */
    char sourceIp[INET_ADDRSTRLEN];
    char destIp[INET_ADDRSTRLEN];
	const char *payload;                           /* Packet payload */

    // parse pcap header
    printf("Packet Header:\n");
    printf("  timestamp (unix sec): %ld\n", header->ts.tv_sec);
    printf("  frame length (bytes): %d\n", header->caplen);
    printf("  capture length (bytes): %d\n", header->len);  // u_char pointer
                                                            // points to the first byte of a chunk of data containing the entire packet

    // parse ethernet header
    ethernetHeader = (struct ethernet_header*)(packet);
    printf("Ethernet:\n");
    printf("  ether type: 0x%x\n", ntohs(ethernetHeader->ether_type));
    printf("  src addr: %02x:%02x:%02x:%02x:%02x:%02x\n",
        (unsigned)ethernetHeader->ether_shost[0],
        (unsigned)ethernetHeader->ether_shost[1],
        (unsigned)ethernetHeader->ether_shost[2],
        (unsigned)ethernetHeader->ether_shost[3],
        (unsigned)ethernetHeader->ether_shost[4],
        (unsigned)ethernetHeader->ether_shost[5]);
    printf("  dst addr: %02x:%02x:%02x:%02x:%02x:%02x\n",
        (unsigned)ethernetHeader->ether_dhost[0],
        (unsigned)ethernetHeader->ether_dhost[1],
        (unsigned)ethernetHeader->ether_dhost[2],
        (unsigned)ethernetHeader->ether_dhost[3],
        (unsigned)ethernetHeader->ether_dhost[4],
        (unsigned)ethernetHeader->ether_dhost[5]);

    if(ntohs(ethernetHeader->ether_type) != ETHERTYPE_IP){
        printf("Ethernet type (hex:0x%x dec:%d) is NOT an IP packet!\n", ntohs(ethernetHeader->ether_type), ntohs(ethernetHeader->ether_type));
        return;
    }

    // parse ip header
    ipHeader = (struct ip_header*)(packet + sizeof(struct ethernet_header));
    printf("IP:\n");
    printf("  src addr: %s\n", inet_ntop(AF_INET, &(ipHeader->ip_src), sourceIp, INET_ADDRSTRLEN));
    printf("  dst addr: %s\n", inet_ntop(AF_INET, &(ipHeader->ip_dst), destIp, INET_ADDRSTRLEN));
    //printf("  length: %hu\n", &(ipHeader->ip_len)); // TODO: fix this
    printf("  ttl (sec): %d\n", ipHeader->ip_ttl);
    printf("  protocol: %d\n", ipHeader->ip_p);

    if(ipHeader->ip_p != IPPROTO_TCP){
        printf("IP Protocol type (hex:0x%x dec:%d) is NOT a TCP packet!\n", ipHeader->ip_p, ipHeader->ip_p);
        return;
    }

    // parse tcp header
    tcpHeader = (struct tcp_header*)(packet + sizeof(struct ethernet_header) + sizeof(struct ip_header));
    printf("TCP:\n");
    printf("  src port: %d\n", ntohs(tcpHeader->th_sport));
    printf("  dst port: %d\n", ntohs(tcpHeader->th_dport));
    printf("  seq: %" PRIu32 "\n", ntohl(tcpHeader->th_seq));
    printf("  ack: %" PRIu32 "\n", ntohl(tcpHeader->th_ack) );

    // parse payload
    payload = (const char *)(packet + sizeof(struct ethernet_header) + sizeof(struct ip_header) + sizeof(struct tcp_header));

    // counter
    numPackets++;

    // styling
    printf("---\n");
}

int main() {
    pcap_t *pcap;
    char errbuf[PCAP_ERRBUF_SIZE];
    
    struct bpf_program fp;
    pcap_stat stats;

    // read file
    pcap = pcap_open_offline(filename, errbuf);
    if (pcap == NULL) {
        std::cout << "Unable to open pcap file: " << filename << std::endl;
		return 0;
	}

    // create filter
    if (pcap_compile(pcap, &fp, filter, 1, 0) == -1) {
        std::cout << "Unable to compile filter " << filter << ": " << pcap_geterr(pcap) << std::endl;
    }
    if (pcap_setfilter(pcap, &fp) == -1) {
        std::cout << "Unable to set filter " << filter << ": " << pcap_geterr(pcap) << std::endl;
    }

    // process each packet in pcap
    pcap_dispatch(pcap, 1 /*-1*/, &process_packet, NULL);

    // close file
	pcap_close(pcap);

    // get the stats
    pcap_stats(pcap, &stats);
    std::cout << "# Packets: " << numPackets << std::endl;
    std::cout << "Received: " << stats.ps_recv << ", Dropped: " << stats.ps_drop << std::endl;
    std::cout << "---" << std::endl;

	return 1;
}