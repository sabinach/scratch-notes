#include <iostream>
#include <list>
using namespace std;

// encapsulation: properties should be private, use methods to be able to access or modify properties of a class

class YouTubeChannel {
private:
    string Name;
    string OwnerName;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

public:
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

    void Subscribe() {
        SubscribersCount++;
    }

    void Unsubscribe() {
        if(SubscribersCount>0)
            SubscribersCount--;
    }

    void PublishVideo(string title) {
        PublishedVideoTitles.push_back(title);
    }

    string GetName() {
        return Name;
    }

    void SetName(string name) {
        Name = name;
    }
};

int main() {
    YouTubeChannel ytChannel("CodeBeauty", "Saldina");
    ytChannel.Subscribe(); // 1
    ytChannel.Subscribe(); // 2
    ytChannel.Unsubscribe(); // 1
    ytChannel.PublishVideo("Video Published");
    ytChannel.GetInfo();

    cout << ytChannel.GetName() << endl;
    ytChannel.SetName("Hello World");
    cout << ytChannel.GetName();

    return 0;
}