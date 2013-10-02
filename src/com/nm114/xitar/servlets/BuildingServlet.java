/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.servlets;

import java.io.IOException;
import java.io.PrintWriter;

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
public class BuildingServlet extends HttpServlet {

    public static final int SERVLET_ID = 1;
    private static String SERVLET_URL = null;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //System.out.println("build - get");

        if (SERVLET_URL == null) {
            SERVLET_URL = request.getRequestURI();
        }

        if (XitarComet.setInstance(SERVLET_URL)) {
            if (hasSequence(request, response)) {
                Player player = (Player) request.getSession(false).getAttribute(CONFIG.PLAYERNAME);
                player.setAction(CONFIG.ACTION_BUILDING);
                player.setAccessSequence(RoomServlet.SERVLET_ID); //for next room action
                player.addCometHandler(SERVLET_URL, response);
            } else {
                sendError(response);
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("build - post");

        String exit = request.getParameter("exit");
        if (exit != null) {
            exitBuilding(request);
        }
        /**
        try {
        Player player = (Player) request.getSession(false).getAttribute(CONFIG.PLAYERNAME);
        if (player.getAccessGet()) {
        int roomid = 0;

        roomid = Integer.parseInt(request.getParameter("room"));

        try {
        int deskid = Integer.parseInt(request.getParameter("desk"));
        player.setSide(Integer.parseInt(request.getParameter("side")));
        Building.addPlayerToDesk(player, Building.getRoom(roomid), deskid);
        } catch (Exception e) {
        Building.addPlayerToRoom(player, Building.getRoom(roomid));
        }

        XitarComet.getInstance(SERVLET_URL).notifyComet();
        } else {
        sendError(response);
        }
        } catch (Exception e) {
        e.printStackTrace();
        sendError(response);
        }
         **/
    }

    private void exitBuilding(HttpServletRequest request) {
        Player player = (Player) request.getSession(false).getAttribute(CONFIG.PLAYERNAME);
        player.exitBuilding();
        try {
            XitarComet.notifyBuildingComet();
        } catch (Exception e) {
        }
    }

    private Boolean hasSequence(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Boolean s = true;
        Player player = ((Player) (request.getSession().getAttribute(CONFIG.PLAYERNAME)));
        try {
            if (player.getAccessSequence() < SERVLET_ID) {
                if (request.getSession(false) != null) {
                    request.getSession(false).invalidate();
                }
                sendError(response);
                s = false;
            }
        } catch (Exception e) {
            s = false;
        }

        return s;
    }

    private void sendError(HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        out.write(CONFIG.NO_ACESS_RIGHT);
        out.close();
    }

    @Override
    public String getServletInfo() {
        return "commit all rooms state and desk state in selected room.";
    }// </editor-fold>

    public static String getUrl() {
        return SERVLET_URL;
    }
}
