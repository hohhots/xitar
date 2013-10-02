/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes.comet;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.HashMap;

import com.sun.enterprise.web.connector.grizzly.comet.CometContext;
import com.sun.enterprise.web.connector.grizzly.comet.CometEngine;
import com.sun.enterprise.web.connector.grizzly.comet.CometHandler;

import com.nm114.xitar.classes.*;
import com.nm114.xitar.classes.xitar.*;
import com.nm114.xitar.servlets.*;

/**
 *
 * @author brgd
 */
public class XitarComet {

    private static HashMap<String, XitarComet> comets = new HashMap();
    private String uri = "";
    private CometContext cometContext = null;

    private XitarComet(String uri) {
        this.uri = uri;
        CometEngine engine = CometEngine.getEngine();
        cometContext = engine.register(uri);
        cometContext.setExpirationDelay(CONFIG.COMETEXPIRATIONDELAY * 1000);
    }

    public static synchronized Boolean setInstance(String uri) {
        Boolean sucess = false;

        if (comets.containsKey(uri)) {
            sucess = true;
        } else {
            XitarComet xc = new XitarComet(uri);
            comets.put(uri, xc);
            sucess = true;
        }

        return sucess;
    }

    public static synchronized void notifyBuildingComet() throws IOException {
        Iterator it = comets.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pairs = (Map.Entry) it.next();
            if (pairs.getKey().toString().contains(BuildingServlet.getUrl()) ||
                    pairs.getKey().toString().contains(RoomServlet.getUrl()) ||
                    pairs.getKey().toString().contains(DeskServlet.getUrl())) {
                ((XitarComet) (pairs.getValue())).notifyComet();
            }
        }
    }

    public static synchronized void notifyRoomComet(int roomid) throws IOException {
        Iterator it = comets.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pairs = (Map.Entry) it.next();
            if (pairs.getKey().toString().contains(RoomServlet.getUrl() + "/" + roomid) ||
                    pairs.getKey().toString().contains(DeskServlet.getUrl() + "/" + roomid)) {
                ((XitarComet) (pairs.getValue())).notifyComet();
            }
        }
    }

    public static synchronized void notifyConfirmPlayerComet(String roomdesk) throws IOException {
        int dp = roomdesk.lastIndexOf("d");
        int roomid = Integer.parseInt(roomdesk.substring(0, dp));
        //int deskid = Integer.parseInt(roomdesk.substring(dp + 1));

        Iterator it = comets.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pairs = (Map.Entry) it.next();
            if (pairs.getKey().toString().contains(DeskServlet.getUrl() + "/" + roomdesk)) {
                ((XitarComet) (pairs.getValue())).notifyComet();
            } else {
                if (pairs.getKey().toString().contains(RoomServlet.getUrl() + "/" + roomid) ||
                        pairs.getKey().toString().contains(DeskServlet.getUrl() + "/" + roomid)) {
                    ((XitarComet) (pairs.getValue())).notifyComet();
                }
            }
        }
    }

     public static synchronized void notifyXitarComet(String url) throws IOException {
        Iterator it = comets.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pairs = (Map.Entry) it.next();
            if (pairs.getKey().toString().contains(url)) {
                ((XitarComet) (pairs.getValue())).notifyComet();
            }
        }
     }

    public static XitarComet getInstance(String uri) {
        XitarComet xc = null;

        if (comets.containsKey(uri)) {
            xc = comets.get(uri);
        }

        return xc;
    }

    public synchronized void notifyComet() throws IOException {
        cometContext.notify(null);
    }

    public void addCometHandler(CometHandler handler) {
        cometContext.addCometHandler(handler);
    }

    public void resumeCometHandler(CometHandler handler) {
        cometContext.resumeCometHandler(handler);
    }
}


