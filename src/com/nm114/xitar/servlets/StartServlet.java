/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;

import com.nm114.xitar.classes.cache.ReadHtmlFile;
import com.nm114.xitar.exception.*;
import com.nm114.xitar.classes.CONFIG;
import com.nm114.xitar.classes.Player;
import com.nm114.xitar.classes.Room;
import com.nm114.xitar.classes.Building;

/**
 *
 * @author brgd
 */
public class StartServlet extends HttpServlet {

    private ReadHtmlFile readHtmlFile = null;
    HttpSession session = null;
    private static String SERVLET_URL = null;

    @Override
    public void init(ServletConfig config) throws ServletException {
        try {
            readHtmlFile = ReadHtmlFile.getInstance();
        } catch (CreateObjectOutOfLimit e) {
            e.printStackTrace();
        }
    }

    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        if (SERVLET_URL == null) {
            SERVLET_URL = request.getRequestURI();
        }

        session = request.getSession();

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        int se = 0;
        try {
            Player player = ((Player) (request.getSession().getAttribute(CONFIG.PLAYERNAME)));
            se = player.getAccessSequence();
        } catch (Exception e) {
        }

        String st = null;
        switch (se) {
            case 0:
                st = readHtmlFile.removeHtmlComment(displayLogin(request));
                break;
            case 1:
                st = readHtmlFile.removeHtmlComment(displayBuilding(request));
                break;
            case 2:
                st = readHtmlFile.removeHtmlComment(displayBuilding(request));
                break;
            case 3:
                st = readHtmlFile.removeHtmlComment(displayBuilding(request));
                break;
            case 4:
                st = readHtmlFile.removeHtmlComment(displayXitar(request));
                break;
            default:
                st = readHtmlFile.getContent("error");
                break;
        }

        try {
            out.print(st);
        } finally {
            out.close();
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //System.out.println("StartServlet - doGet()");

        processRequest(request, response);
    }

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        try {
            out.print(readHtmlFile.getContent("error"));
        } finally {
            out.close();
        }
    }

    /** 
     * Returns a short description of the servlet.
     */
    public String getServletInfo() {
        return "determine if load login form.";
    }// </editor-fold>

    private String displayLogin(HttpServletRequest request) {
        Player player = (Player) (session.getAttribute("player"));

        String st = setCssFilename(player);
        st = setJsFilename(player, st);

        return st;
    }

    private String displayBuilding(HttpServletRequest request) {

        Player player = (Player) (session.getAttribute("player"));

        String init = "";
        if ((player.hasDesk(null)) || (player.hasRoom(null))) {
            init = player.getRoomInitial();
        } else {
            init = player.getInitial();
        }

        StringBuilder tr = new StringBuilder();
        int id = player.getId();

        Room[] rooms = Building.getRooms();

        int i = 0;
        while (i < rooms.length) {
            tr.append("<tr id=\"room" + i + "\">" +
                    "<td id=\"room_num" + i + "\" class=\"" + CONFIG.ROOMNUM_CLASS + "\">" + (rooms[i].getId() + 1) + "</td>" +
                    "<td id=\"players" + i + "\" class=\"" + CONFIG.PLAYERS_CLASS + "\">" + rooms[i].getPlayers() + "</td>" +
                    "</tr>");
            i++;
        }

        String st = setCssFilename(player);
        st = setJsFilename(player, st);
        st = st.replaceAll("<---initial--->", init).replaceAll("<---id--->", ("" + id)).replaceAll("<---rooms--->", tr.toString());

        return st;
    }

    private String displayXitar(HttpServletRequest request) {
        Player player = (Player) (session.getAttribute("player"));

        String init = player.getXitarBoardInitial();

        String st = setCssFilename(player);
        st = setJsFilename(player, st);
        st = st.replaceAll("<---initial--->", init);

        return st;
    }

    private String setCssFilename(Player player) {

        String css = "css/";
        String st = "";

        int se = 0;
        try {
            se = player.getAccessSequence();
        } catch (Exception e) {
        }

        switch (se) {
            case 0:
                st = readHtmlFile.getContent("login");
                css += "login.css";
                break;
            case 1:
                st = readHtmlFile.getContent("building");
                css += "building.css";
                break;
            case 2:
                st = readHtmlFile.getContent("building");
                css += "building.css";
                break;
            case 3:
                st = readHtmlFile.getContent("building");
                css += "building.css";
                break;
            case 4:
                st = readHtmlFile.getContent("xitar");
                css += "xitar.js";
                break;
            default:
                break;
        }

        String s = st.replaceAll("<---css--->", css);

        return s;
    }

    private String setJsFilename(Player player, String cont) {
        String staticjs = "js/static/";
        String varjs = "js/var/";
        String st = cont;

        int se = 0;
        try {
            se = player.getAccessSequence();
        } catch (Exception e) {
        }

        switch (se) {
            case 0:
                staticjs += "login.js";
                break;
            case 1:
                staticjs += "building.js";
                break;
            case 2:
                staticjs += "building.js";
                break;
            case 3:
                staticjs += "building.js";
                break;
            case 4:
                staticjs += "xitar.js";
                break;
            default:
                break;
        }

        Calendar cal = Calendar.getInstance();
        String init = "" + cal.getTimeInMillis();
        varjs += init + ".js";

        String s = st.replaceAll("<---static--->", staticjs).replaceAll("<---var--->", varjs);

        return s;
    }

    public static String getUrl() {
        return SERVLET_URL;
    }
}
