/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nm114.xitar.classes.*;
import com.nm114.xitar.classes.comet.*;

/**
 *
 * @author brgd
 */
public class RoomServlet extends HttpServlet {

    public static final int SERVLET_ID = 2;
    private static String SERVLET_URL = "";

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //System.out.println("room- get");

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        if (SERVLET_URL.equals("")) {
            SERVLET_URL = request.getRequestURI().substring(0, request.getRequestURI().lastIndexOf("/"));
        }

        if (hasSequence(request, response)) {
            int roomid = Integer.parseInt(request.getRequestURI().substring(request.getRequestURI().lastIndexOf("/") + 1));

            if (roomid < Building.getRooms().length) {
                Room room = Building.getRoom(roomid);

                if (XitarComet.setInstance(room.getUrl())) {

                    Player player = (Player) request.getSession(false).getAttribute(CONFIG.PLAYERNAME);
                    player.setAction(CONFIG.ACTION_ROOM);
                    player.setAccessSequence(DeskServlet.SERVLET_ID);  //for next desk action

                    if (player.hasRoom(room)) {
                        player.addCometHandler(SERVLET_URL, response);
                    } else {
                        player.addPlayerToRoom(room);
                        XitarComet.notifyBuildingComet();

                        try {
                            out.println(player.getRoomInitial());
                        } finally {
                            out.close();
                        }
                    }
                }
            }

        } else {
            sendMessage(response, CONFIG.NO_ACESS_RIGHT);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException,
            IOException {
        //System.out.println("room - post");
        /**response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        int roomid = Integer.parseInt(request.getRequestURI().substring(request.getRequestURI().lastIndexOf("/") + 1));
        Room room = Building.getRoom(roomid);
        Player player = (Player) request.getSession(false).getAttribute(CONFIG.PLAYERNAME);

        if ((player.hasRoom(room)) && (request.getParameter("desk") != null)) {
        int deskid = -1;
        deskid = Integer.parseInt(request.getParameter("desk"));
        player.addPlayerToDesk(player.getRoom().getDesk(deskid));
        XitarComet.notifyAllDeskComet(roomid);
        } else {
        if ((player.hasDesk(null)) && (request.getParameter("confirmuser") != null)) {
        int agree = Integer.parseInt(request.getParameter("confirmuser"));
        if (!player.getDesk().addPlayerConfirm(player, agree)) {
        XitarComet.notifyAllDeskComet(roomid);
        } else {
        //XitarComet.notifyPlayerConfirmedComet(roomid, player.getDesk().getId());
        }
        } else {
        sendMessage(response, CONFIG.NO_ACESS_RIGHT);
        }
        }
         * **/
    }

    private Boolean hasSequence(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Boolean s = true;
        Player player = ((Player) (request.getSession().getAttribute(CONFIG.PLAYERNAME)));
        try {
            if (player.getAccessSequence() < SERVLET_ID) {
                if (request.getSession(false) != null) {
                    request.getSession(false).invalidate();
                }
                s = false;
            }
        } catch (Exception e) {
            s = false;
        }

        return s;
    }

    private void sendMessage(HttpServletResponse response, String message) throws IOException {
        PrintWriter out = response.getWriter();
        out.write(message);
        out.close();
    }

    @Override
    public String getServletInfo() {
        return "commit all desks state and room state in selected room.";
    }// </editor-fold>

    public static String getUrl() {
        return SERVLET_URL;
    }
}

