#include <iostream>
#include <list>
using namespace std;

// constructor must have same name as class and not have a return type

class YouTubeChannel {
public:
    string Name;
    string OwnerName;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

    YouTubeChannel(string name, string ownerName) {
        Name = name;
        OwnerName = ownerName;
        SubscribersCount = 0;
    }

    void GetInfo() {
        cout << "Name: " << Name << endl;
        cout << "OwnerName: " << OwnerName << endl;
        cout << "SubscribersCount: " << SubscribersCount << endl;
        cout << "Videos:" << endl;
        for (string videoTitle: PublishedVideoTitles) {
            cout << videoTitle << endl;
        }
        cout << endl;
    }
};

int main() {
    YouTubeChannel ytChannel("CodeBeauty", "Saldina");
    ytChannel.PublishedVideoTitles.push_back("Video 1");
    ytChannel.PublishedVideoTitles.push_back("Video 2");
    ytChannel.SubscribersCount = 1000000; // this is not safe! (next script will show how to encapsulate)

    YouTubeChannel ytChannel2("AmySings", "Amy");
    ytChannel2.PublishedVideoTitles.push_back("Song 1");

    ytChannel.GetInfo();
    ytChannel2.GetInfo();

    return 0;
}