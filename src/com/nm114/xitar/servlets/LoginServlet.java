/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nm114.xitar.classes.CONFIG;
import com.nm114.xitar.classes.UsersId;
import com.nm114.xitar.classes.Player;
import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class LoginServlet extends HttpServlet {

    private static final String PASSWORD = "1";

    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String passcode = (String) request.getParameter("passcode");
        HttpSession hs = request.getSession();
        if ((PASSWORD.equals(passcode)) && ((Integer)hs.getAttribute("sequence") == 0)){
            try {
                hs.setMaxInactiveInterval(CONFIG.SESSIONOUTTIME);
                Player p = Player.getInstance();
                p.setAccessSequence(BuildingServlet.SERVLET_ID);
                hs.setAttribute(CONFIG.PLAYERNAME, p);
            } catch (CreateObjectOutOfLimit e) {
                e.printStackTrace();
            }
        }
        closeOut(out);
    }

    private void closeOut(PrintWriter out) {
        try {
            out.println("");
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
        processRequest(request, response);
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "check login password.";
    }// </editor-fold>
}
