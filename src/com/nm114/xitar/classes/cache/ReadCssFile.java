/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes.cache;

import com.nm114.xitar.classes.*;
import java.io.*;
import java.net.*;

import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class ReadCssFile extends ReadFile {

    //<editor-fold defaultstate="collapsed" desc="VARIABLES.">
    //<editor-fold defaultstate="collapsed" desc="STATIC variables.">
    private static int objCount = 0;
    //
    private static String absolutePath = null;
    private static final String css_url = "web/css/";
    private static final String css_global_url = css_url + "global.css";
    private static final String css_login_url = css_url + "login.css";
    private static final String css_building_url = css_url + "building.css";
    private static final String css_xitar_url = css_url + "xitar.css";
    //
    private static String css_global_content = null;
    private static String css_login_content = null;
    private static String css_building_content = null;
    private static String css_xitar_content = null;
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="OBJECT variables. empty">
    //</editor-fold>
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="METHODS.">
    //<editor-fold defaultstate="collapsed" desc="STATIC methods.">
    public static synchronized ReadCssFile getInstance() throws CreateObjectOutOfLimit {
        if (objCount < objLimit) {
            ++objCount;
            return new ReadCssFile();
        } else {
            throw new CreateObjectOutOfLimit("Create ReadCssFile object Out of limit.");
        }
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="INITIAL methods.">
    private ReadCssFile() {

        URL location;
        String classLocation = ReadHtmlFile.class.getName().replace('.', '/') + ".class";
        ClassLoader loader = ReadHtmlFile.class.getClassLoader();
        location = loader.getResource(classLocation);
        String stl = location.toString();
        String t = stl.substring(stl.indexOf('/'), stl.lastIndexOf(classLocation) - 1);
        if (t.indexOf(":/") != -1) { //windows
            t = t.substring(t.indexOf('/') + 1);
        }
        absolutePath = t.substring(0, t.lastIndexOf('/') + 1);

        css_global_content = readContent(css_global_url);
        css_login_content = readContent(css_login_url);
        css_building_content = readContent(css_building_url);
        css_xitar_content = readContent(css_xitar_url);
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="SET methods. empty">
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="GET methods.">
    public String getContent(Player player) {
        int se = 0;
        try {
            se = player.getAccessSequence();
        } catch (Exception e) {
        }

        StringBuilder contents = new StringBuilder();

        switch (se) {
            case 0:
                contents.append(css_global_content).append(css_login_content);
                break;
            case 1:
                contents.append(css_global_content).append(css_building_content);
                break;
            case 2:
                contents.append(css_global_content).append(css_building_content);
                break;
            case 3:
                contents.append(css_global_content).append(css_building_content);
                break;
            case 4:
                contents.append(css_global_content).append(css_xitar_content);
                break;
            default:
                contents.append(content);
                break;
        }

        return contents.toString();
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="CAN methods. empty">
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Has methods. empty">
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="DELETE methods. empty">
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="ADD methods. empty">
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="other methods.">
    public String readContent(String name) {
        StringBuilder contents = new StringBuilder();

        try {
            File f = new File(absolutePath + name);
            InputStreamReader read = new InputStreamReader(new FileInputStream(f), "UTF-8");
            BufferedReader input = new BufferedReader(read);
            try {
                String line = null;
                while ((line = input.readLine()) != null) {
                    contents.append(line);
                }
            } finally {
                content = contents.toString();
                input.close();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return content;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="INNER OBJECTS. empty">
    //</editor-fold>
}
