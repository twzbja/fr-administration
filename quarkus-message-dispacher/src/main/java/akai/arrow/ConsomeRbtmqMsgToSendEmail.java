package akai.arrow;

import akai.arrow.services.MailSender;
import akai.arrow.services.Message;
import akai.arrow.services.ServiceUtil;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.locks.ReentrantLock;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.Path;

import org.eclipse.microprofile.reactive.messaging.Incoming;

import com.oracle.svm.core.annotate.Inject;

import io.quarkus.mailer.Mail;

import com.oracle.svm.core.annotate.Inject;

import io.quarkus.mailer.Mailer;
import io.vertx.core.json.JsonObject;
 
@ApplicationScoped
public class ConsomeRbtmqMsgToSendEmail {

    //definition de verrou
    public  static ReentrantLock lock = new ReentrantLock();
    
    ServiceUtil util= new ServiceUtil();
    
    private Mailer mailer;
    public ConsomeRbtmqMsgToSendEmail(Mailer mailer){
        this.mailer=mailer;
    }

    //methode principale de traitement du microservice
    @Incoming("books_queue")
    public void consume(byte[] p) {
        
        //Extraction de donnée dans le flux recu par le canal
        String string_data = new String(p, StandardCharsets.UTF_8);
        JsonObject jsonobject_data = new JsonObject(new String(string_data));
        JsonObject data = jsonobject_data.getJsonObject("data");
        //Traitement de la donnée par la classe ServiceUtil
        Message msg = this.util.mapData(data);
        System.out.println("**Message recu :"+msg.toString());
        //Envoie du mail au destinataire
        
        Runnable ran = ()->{
            try {
            //
            String email=msg.destinator;
            String topic=msg.topic;
            String message=msg.message;

            //System.out.println(msg.destinator);
            //
            Mail mail= Mail.withText(email,topic,message);
            lock.lock();
            mailer.send(mail);
            System.out.println("**Section critique**");

            } catch (Exception e) {
                System.out.println("echec d'envoie de mail au l'adresse email : "+msg.destinator+"");
            }
            finally{
                lock.unlock();
            }
        };

        Thread td = new Thread(ran);
        td.start();
    }
}

