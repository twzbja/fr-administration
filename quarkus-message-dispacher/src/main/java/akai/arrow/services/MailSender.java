package akai.arrow.services;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;


public class MailSender {

    /* 
    private final Mailer mailer;
    public MailSender(Mailer mailer) {
        this.mailer = mailer;
    }
    */
    //Methode d'envoie de mail à un utilisateur 
    /* 
    public void mail(Mailer mailer) {
        try {
            Mail mail= Mail.withText("kone.wolouho@gmail.com", "création d'association", "");
            mailer.send(mail);
        } catch (Exception e) {
            System.out.println("the mailer client fail to send the mail");
            System.out.println(e.getMessage());
        }
    }
    //Methode d'envoie de mail a un groupe de user
    //methode de test
    public void showMsg(Message msg){
        System.out.println("\n-------DETAILS DU MESSAGE QUI DOIT ETRE ENVOYER À L'UTILISATEUR-----");
        System.out.println(msg.toString());
        System.out.println("\n-------THIS IS A PROGRAM GIVEN BY DARKONE-----");
    }
    */
}
