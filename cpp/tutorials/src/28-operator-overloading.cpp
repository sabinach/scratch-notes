#include <iostream>
#include <string>
#include <list>
using namespace std;

// operator overloading: define how operators act when provided different types

// members of a class are private by default
// members of a structure are public by default

struct YouTubeChannel {
    string Name; // attributes
    int SubscribersCount;

    YouTubeChannel(string name, int subscribersCount) {
        Name = name;
        SubscribersCount = subscribersCount;
    }

    bool operator==(const YouTubeChannel& channel) const { // const to tell compiler that we will not change the parameters
        return this->Name == channel.Name;
    }
};

// global function
ostream& operator<<(ostream& COUT, YouTubeChannel& ytChannel) { // pass by reference (original objects)
    COUT << "Name: " << ytChannel.Name << endl;
    COUT << "Subscribers: " << ytChannel.SubscribersCount << endl;
    return COUT;
}

struct MyCollection {
    list<YouTubeChannel>myChannels;

    // member function
    void operator+=(YouTubeChannel& channel) {
        // this = the first operand (aka. myCollection)
        this->myChannels.push_back(channel);
    }

    void operator-=(YouTubeChannel& channel) {
        this->myChannels.remove(channel);
    }
};

ostream& operator<<(ostream& COUT, MyCollection& collection) { 
    for(YouTubeChannel ytChannel:collection.myChannels) {
        cout << ytChannel;
    }
    return COUT;
}

int main() {
    YouTubeChannel yt1 = YouTubeChannel("CodeBeauty", 750000);
    //cout << yt1; // insertion operators don't know what to do with the two operands: cout, yt1
                 // need to overload this insertion function!
    //operator<<(cout, yt1); // another way to call the same function

    YouTubeChannel yt2 = YouTubeChannel("Alt Channel", 1000);
    //cout << yt1 << yt2;

    MyCollection myCollection;
    myCollection += yt1;
    myCollection += yt2;
    myCollection -= yt2;
    cout << myCollection;
    
    return 0;
}