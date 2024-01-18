package akai.arrow.services;

public class Message {
    public String association;
    public String destinator;
    public String topic;
    public String message;
    public Message(String assoc,String dest,String topic, String messsage){
        this.association=assoc;
        this.destinator=dest;
        this.topic=topic;
        this.message=messsage;
    }
    @Override
    public String toString() {
        // TODO Auto-generated method stub
        String chaine="\n association = "+this.association+"\n mail of destinator = "+this.destinator+"\n topic = "+this.topic+"\n message = "+this.message;
        return chaine ;
    }
}
