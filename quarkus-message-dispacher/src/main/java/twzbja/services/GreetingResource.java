package twzbja.services;

import io.quarkus.mailer.Mailer;
import twzbja.services.services.MailSender;
import twzbja.services.services.ServiceUtil;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("/hello")
public class GreetingResource {

    @Inject Mailer mailer;
    MailSender sender = new MailSender();
    ServiceUtil util= new ServiceUtil();
    
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello from RESTEasy Reactive";
    }
}