#include <iostream>
#include <list>
using namespace std;

// polymorphism: ability for an object to have multiple forms
//  ie. two classes inherit from one base class that each have a method of the same name with different functionality

class YouTubeChannel {
private:
    string Name;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

protected: 
    string OwnerName;
    int ContentQuality;

public:
    YouTubeChannel(string name, string ownerName) {
        Name = name;
        OwnerName = ownerName;
        SubscribersCount = 0;
        ContentQuality = 0;
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

    void CheckAnalytics() {
        cout << "ContentQuality: " << ContentQuality << endl;
    }
};

class CookingYouTubeChannel: public YouTubeChannel { 
public:
    CookingYouTubeChannel(string name, string ownerName):YouTubeChannel(name, ownerName){
        
    }

    void Practice() {
        cout << OwnerName << " is cooking..." << endl;
        ContentQuality++;
    }
};

class SingingYouTubeChannel: public YouTubeChannel {
public:
    SingingYouTubeChannel(string name, string ownerName):YouTubeChannel(name, ownerName){
        
    }

    void Practice() {
        cout << OwnerName << " is singing..." << endl;
        ContentQuality++;
    }
};

int main() {
    CookingYouTubeChannel cookingYtChannel("Amy's Kitchen", "Amy");
    cookingYtChannel.Practice();
    cookingYtChannel.Practice();
    cookingYtChannel.Practice();
    cookingYtChannel.Practice();
    cookingYtChannel.Practice();

    SingingYouTubeChannel singingYtChannel("John's Music", "John");
    singingYtChannel.Practice();

    // pointer of base class can point to a variable of derived class
    YouTubeChannel* yt1 = &cookingYtChannel;
    YouTubeChannel* yt2 = &singingYtChannel;

    // use -> if using pointers
    yt1->CheckAnalytics();
    yt2->CheckAnalytics();

    return 0;
}