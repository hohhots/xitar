/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;

import com.sun.enterprise.web.connector.grizzly.comet.CometEvent;
import com.sun.enterprise.web.connector.grizzly.comet.CometHandler;

import com.nm114.xitar.classes.comet.XitarComet;
import com.nm114.xitar.servlets.*;
import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class Player {

    // <editor-fold defaultstate="collapsed" desc="VARIABLES.">
    // <editor-fold defaultstate="collapsed" desc="STATIC variables.">
    private static final int objLimit = CONFIG.getUsersNum();
    private static int objCount = 0;
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="OBJECT variables.">
    private int accessSequence = 0;
    private int id = 0;
    private Room room = null;
    private Desk desk = null;
    private XitarCometHandler handler = new XitarCometHandler();
    private int action = 0;
    //</editor-fold>
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="METHODS.">
    // <editor-fold defaultstate="collapsed" desc="STATIC methods.">
    public static synchronized Player getInstance() throws CreateObjectOutOfLimit {
        if (objCount < objLimit) {
            ++objCount;
            return new Player();
        } else {
            throw new CreateObjectOutOfLimit("Create player object Out of limit.");
        }
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="INITIAL methods.">
    private Player() {
        id = UsersId.useUserID();
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="SET methods.">
    public void setAccessSequence(int seq) {
        this.accessSequence = seq;
    }

    public void setAction(int action) {
        this.action = action;
    }

    public void setDesk(Desk Tdesk) {
        //System.out.print("Player - setDesk()" );

        if ((desk != null)) {
            desk.deletePlayer(this);
        }
        desk = Tdesk;
    }

    public void setRoom(Room Troom) {
        //System.out.print("Player - setRoom()" );

        if ((room != null)) {
            room.deletePlayer(this);
        }
        room = Troom;
    }

    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="GET methods.">
    public int getId() {
        return id;
    }

    public Desk getDesk() {
        return desk;
    }

    public Room getRoom() {
        return room;
    }

    public int getAccessSequence() {
        return this.accessSequence;
    }

    public String getInitial() {

        int croomid = -1;
        String rooms = "-1";

        StringBuilder tr = new StringBuilder();

        try {
            croomid = room.getId();
        } catch (Exception e) {
        }
        rooms = Building.getRoomsStatus();

        tr.append("{\"playerid\":" + id + ",\"roomsplayers\":" + rooms + ",\"currentroomid\":" + croomid);
        tr.append("}");

        return tr.toString();
    }

    public String getRoomInitial() {
        //System.out.println("Player - getRoomInitial()");

        String desks = "-1";
        String tr;

        try {
            desks = room.getDesksStatus();
        } catch (Exception e) {
        }

        tr = getInitial().replaceAll("}", ",\"desks\":" + desks + "}");

        return tr;
    }

    public String getXitarBoardInitial() {
        StringBuilder tr = new StringBuilder();
        String tstep = desk.getXitarBoard().getStepsInJSON();
        String step = "";
        if (!tstep.equals("")) {
            step = ",\"steps\":" + tstep;
        }

        tr.append("{\"desk\":\"" + room.getId() + CONFIG.ROOM_DESK_SEPERATOR + desk.getId() + "\",\"playerid\":" + id + ",\"players\":" + desk.getPlayersIdInJSON() + ",\"position\":" + desk.getXitarBoard().getPositionInJSON() +
                step + ",\"gameend\":\"" + desk.getGameEnd() + "\"");
        tr.append("}");

        return tr.toString();
    }

    public String getResponseContent() {
        //System.out.println("player - getResponseContent()");
        String cont = "";

        if (action == CONFIG.ACTION_BUILDING) {
            cont = getInitial();
        }

        if (action == CONFIG.ACTION_ROOM) {
            cont = getRoomInitial();
        }

        if (action == CONFIG.ACTION_DESK) {
            cont = getRoomInitial();
            if ((desk != null) && (desk.isplayer2Confirmed())) {
                cont = CONFIG.REFRESH;
            }
        }

        if (action == CONFIG.ACTION_XITAR_LASTSTEP) {
            cont = "{\"laststep\":" + desk.getXitarBoard().getLastStepInJSon() + "}";
        }

        if (action == CONFIG.ACTION_XITAR_EXIT) {
            cont = CONFIG.REFRESH;
        }

        if (action == CONFIG.ACTION_XITAR_END) {
            cont = CONFIG.ENDGAME;
        }

        return cont;
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="CAN methods. empty">
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Has methods. ">
    public Boolean hasRoom(Room Troom) {
        if (Troom == null) {
            if (room != null) {
                return true;
            }
        } else {
            if (room == Troom) {
                return true;
            }
        }
        return false;
    }

    public Boolean hasDesk(Desk Tdesk) {
        if (Tdesk == null) {
            if (desk != null) {
                return true;
            }
        } else {
            if (desk == Tdesk) {
                return true;
            }
        }
        return false;
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="DELETE methods.">
    public synchronized void deleteInstance() {
        --objCount;
    }

    public Boolean deleteId() {
        if (desk != null) {
            deleteDesk();
        }
        if (room != null) {
            deleteRoom();
        }

        UsersId.unuseUserID(id);

        return true;
    }

    public void deleteDesk() {
        if (desk != null) {
            desk.deletePlayer(this);
            desk = null;
        }
    }

    public void deleteRoom() {
        if (room != null) {
            room.deletePlayer(this);
            room = null;
        }
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="ADD methods.">
    public Boolean addPlayerToRoom(Room room) {
        if (!hasRoom(room)) {
            if (room.addPlayer(this)) {
                return true;
            }
        }
        return false;
    }

    public Boolean addPlayerToDesk(Desk desk) {
        if (!hasDesk(desk)) {
            this.deleteDesk();
            if (desk.addPlayer(this)) {
                return true;
            }
        }
        return false;
    }

    public void addCometHandler(String url, HttpServletResponse response) {
        handler.attach(response);

        if (url.equals(BuildingServlet.getUrl())) {
            addBuildingHandler();
        }
        if (url.equals(RoomServlet.getUrl())) {
            addRoomHandler();
        }
        if (url.equals(DeskServlet.getUrl())) {
            addDeskHandler();
        }
        if (url.equals(XitarServlet.getUrl())) {
            addXitarHandler();
        }
    }

    private void addBuildingHandler() {
        String uri = BuildingServlet.getUrl();
        addAllHandler(uri);
    }

    private void addRoomHandler() {
        String uri = room.getUrl();
        addAllHandler(uri);
    }

    private void addDeskHandler() {
        String uri = desk.getUrl();
        addAllHandler(uri);
    }

    private void addXitarHandler() {
        String uri = desk.getXitarBoard().getUrl();
        addAllHandler(uri);
    }

    private void addAllHandler(String uri) {
        XitarComet xc = XitarComet.getInstance(uri);
        xc.addCometHandler(handler);
    }

    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="other methods.">
    public void exitBuilding() {
        deleteDesk();
        deleteRoom();
        accessSequence = 0;
    }
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="INNER OBJECTS.">

    private class XitarCometHandler implements CometHandler<HttpServletResponse> {

        private HttpServletResponse response;

        public void onEvent(CometEvent event) throws IOException {
            //System.out.println("onEvent - " + event.getType());
            if (CometEvent.NOTIFY == event.getType()) {
                String uri = event.getCometContext().getContextPath();
                content();

                XitarComet.getInstance(uri).resumeCometHandler(this);//removeComethandler();
            }
        }

        public void onInitialize(CometEvent event) throws IOException {
            //System.out.println("onInitialize - " + event.getType());
        }

        public void onInterrupt(CometEvent event) throws IOException {
            //System.out.println("onInterrupt - " + event.getType());

            PrintWriter writer = response.getWriter();
            writer.write("i");
            //writer.flush();
            writer.close();
        }

        public void onTerminate(CometEvent event) throws IOException {
            //System.out.println("onTerminate - " + event.getType());
        }

        public void attach(HttpServletResponse res) {
            response = res;
        }

        private void content() throws IOException {
            //System.out.println("content");
            PrintWriter writer = response.getWriter();
            writer.write(getResponseContent());
            //writer.flush();
            writer.close();
        }
    }
    //</editor-fold>
}
