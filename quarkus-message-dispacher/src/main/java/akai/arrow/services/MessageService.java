package akai.arrow.services;

/* 
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.json.JsonObject;

import com.oracle.svm.core.annotate.Inject;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;
import com.rabbitmq.client.AMQP.Connection;

import akai.arrow.ConsomeRbtmqMsgToSendEmail;
import io.quarkus.runtime.StartupEvent;
import io.vertx.core.impl.logging.Logger;
import io.vertx.core.impl.logging.LoggerFactory;
import io.vertx.mutiny.rabbitmq.RabbitMQClient;

/* 
@ApplicationScoped
public class MessageService {
    /* 
    private static final Logger log = LoggerFactory.getLogger(MessageService.class);

    @Inject
    RabbitMQClient rabbitMQClient;

    private Channel channel;

    public void onApplicationStart(@Observes StartupEvent event) {
        // on application start prepare the queus and message listener
        //setupQueues();
        try {
            setupReceiving();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }

    private void setupReceiving() throws TimeoutException {
        try {
            ConnectionFactory factory = new ConnectionFactory();
            com.rabbitmq.client.Connection conn = factory.newConnection();
            channel = conn.createChannel();
            
            // register a consumer for messages
            channel.basicConsume("books_queue", true, new DefaultConsumer(channel) {
                @Override
                public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                    // just print the received message.
                    log.info("Received: " + new String(body, StandardCharsets.UTF_8));
                }
            });
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
*/