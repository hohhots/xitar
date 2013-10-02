/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.listeners;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.nm114.xitar.classes.CONFIG;
import com.nm114.xitar.classes.Player;
import com.nm114.xitar.classes.xitar.XitarBoard;

import com.nm114.xitar.classes.comet.*;

/**
 *
 * @author brgd
 */
public class SessionListener implements HttpSessionListener {

    public void sessionCreated(HttpSessionEvent event) {
        //System.out.println("sessionCreated");
        event.getSession().setAttribute("sequence", 0);
    }

    public void sessionDestroyed(HttpSessionEvent event) {
        System.out.println("sessionDestroyed");

        try {
            HttpSession hs = event.getSession();
            Player p = (Player) hs.getAttribute(CONFIG.PLAYERNAME);
            if (p != null) {
                p.deleteId();
            }
            p.deleteInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
