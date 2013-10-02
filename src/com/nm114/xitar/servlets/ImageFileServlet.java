/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.servlets;

import com.nm114.xitar.classes.cache.ReadImageFile;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nm114.xitar.classes.*;
import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class ImageFileServlet extends HttpServlet {

    private static ReadImageFile readImageFile = null;

    @Override
    public void init(ServletConfig config) throws ServletException {
        try {
            readImageFile = ReadImageFile.getInstance();
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
        String file = uri.substring(uri.lastIndexOf("/") + 1);
        String mima = file.substring(file.lastIndexOf(".") + 1).toLowerCase();

        String type = null;
        if (mima.equals("gif")) {
            type = "gif";
        }
        if (mima.equals("jpg")) {
            type = "jpg";
        }
        if (mima.equals("png")) {
            type = "png";
        }
        if (type == null) {
            System.out.println("Unrecognized image file type." + " - " + mima);
        } else {
            byte[] image = readImageFile.getContent(player, file);

            if (image != null) {
                response.setContentType(type);
                ServletOutputStream out = response.getOutputStream();
                try {
                    out.write(image);
                } finally {
                    out.close();
                }
            } else {
                System.out.println("NULL image");
            }
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
        processRequest(request, response);
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
