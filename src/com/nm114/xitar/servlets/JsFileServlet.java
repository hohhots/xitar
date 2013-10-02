/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.*;
import javax.servlet.http.*;

import com.nm114.xitar.classes.cache.ReadJSFile;
import com.nm114.xitar.exception.*;
import com.nm114.xitar.classes.CONFIG;
import com.nm114.xitar.classes.Player;
import com.nm114.xitar.classes.Room;
import com.nm114.xitar.classes.Building;

/**
 *
 * @author brgd
 */
public class JsFileServlet extends HttpServlet {

    private static ReadJSFile readJSFile = null;

    @Override
    public void init(ServletConfig config) throws ServletException {
        try {
            readJSFile = ReadJSFile.getInstance();
        } catch (CreateObjectOutOfLimit e) {
            e.printStackTrace();
        }
    }

    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Player player = ((Player) (request.getSession().getAttribute(CONFIG.PLAYERNAME)));

        String uri = request.getRequestURI();
        String t = uri.substring(0, uri.lastIndexOf("/"));
        String state = t.substring(t.lastIndexOf("/") + 1);
        String st = "";
        if (state.equals("static")) {
            st = readJSFile.getStaticContent(player);
        } else {
            st = readJSFile.getVarContent(player);
        }

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

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
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //System.out.println("JsFileServlet - get()");
        processRequest(request, response);
    }

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //System.out.println("JsFileServlet - post()");
    //processRequest(request, response);
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
