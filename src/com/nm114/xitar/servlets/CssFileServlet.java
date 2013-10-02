/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.*;
import javax.servlet.http.*;

import com.nm114.xitar.classes.cache.ReadCssFile;
import com.nm114.xitar.exception.*;
import com.nm114.xitar.classes.CONFIG;
import com.nm114.xitar.classes.Player;

/**
 *
 * @author brgd
 */
public class CssFileServlet extends HttpServlet {

    private static ReadCssFile readCssFile = null;

    @Override
    public void init(ServletConfig config) throws ServletException {
        try {
            readCssFile = ReadCssFile.getInstance();
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

        String st = "";

        st = readCssFile.getContent(player);

        response.setContentType("text/css;charset=UTF-8");
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
