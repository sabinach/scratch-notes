#include <iostream>
#include <list>
using namespace std;

// base class: YouTubeChannel
// derived class: CookingYouTubeChannel (the one that inherits)

class YouTubeChannel {
private: // not accessible anywhere outside
    string Name;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

protected: // accessible in derived classes only
    string OwnerName;

public:
    YouTubeChannel(string name, string ownerName) { // constructor
        Name = name;
        OwnerName = ownerName;
        SubscribersCount = 0;
    }

    void GetInfo() { // method
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

class CookingYouTubeChannel: public YouTubeChannel { // whatever is public in YouTubeChannel will also be public in CookingYouTubeChannel
public:
    CookingYouTubeChannel(string name, string ownerName):YouTubeChannel(name, ownerName){
        
    }

    void Practice() {
        cout << OwnerName << " is practicing cooking..." << endl;
    }
};

int main() {
    CookingYouTubeChannel cookingYtChannel("Amy's Kitchen", "Amy");
    cookingYtChannel.PublishVideo("Chocolate Cake");
    cookingYtChannel.PublishVideo("Apple Pie");
    cookingYtChannel.Subscribe();
    cookingYtChannel.Subscribe();
    cookingYtChannel.GetInfo();
    cookingYtChannel.Practice();

    YouTubeChannel ytChannel("CodeBeauty", "Saldina");
    //ytChannel.Practice(); // method is not available for this base class!

    return 0;
}