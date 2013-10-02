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
public class ReadJSFile extends ReadFile {

    //<editor-fold defaultstate="collapsed" desc="VARIABLES.">
    //<editor-fold defaultstate="collapsed" desc="STATIC variables.">
    private static int objCount = 0;
    private static String absolutePath = null;
    //
    private static final String yui_url = "/yui/";
    private static final String yui_yahoo_dom_event_url = yui_url + "yahoo-dom-event.js";
    private static final String yui_connection_url = yui_url + "connection.js";
    private static final String yui_get_url = yui_url + "get.js";
    private static final String yui_animation_url = yui_url + "animation.js";
    private static final String yui_json_url = yui_url + "json.js";
    private static String yui_yahoo_dom_event_content = null;
    private static String yui_connection_content = null;
    private static String yui_get_content = null;
    private static String yui_animation_content = null;
    private static String yui_json_content = null;
    //
    private static final String global_url = "global.js";
    private static final String login_url = "login.js";
    private static final String building_url = "building.js";
    private static final String xitar_url = "xitar.js";
    private static String globalContent = null;
    private static String loginContent = null;
    private static String buildingContent = null;
    private static String xitarContent = null;
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="OBJECT variables. empty">
    //
    //</editor-fold>
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="METHODS.">
    //<editor-fold defaultstate="collapsed" desc="STATIC methods.">
    public static synchronized ReadJSFile getInstance() throws CreateObjectOutOfLimit {
        if (objCount < objLimit) {
            ++objCount;
            return new ReadJSFile();
        } else {
            throw new CreateObjectOutOfLimit("Create ReadJSFile object Out of limit.");
        }
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="INITIAL methods.">
    private ReadJSFile() {

        URL location;
        String classLocation = ReadHtmlFile.class.getName().replace('.', '/') + ".class";
        ClassLoader loader = ReadHtmlFile.class.getClassLoader();
        location = loader.getResource(classLocation);
        String stl = location.toString();
        String t = stl.substring(stl.indexOf('/'), stl.lastIndexOf(classLocation) - 1);
        if (t.indexOf(":/") != -1) { //windows
            t = t.substring(t.indexOf('/') + 1);
        }
        absolutePath = t.substring(0, t.lastIndexOf('/') + 1) + "web/js/";

        yui_yahoo_dom_event_content = readContent(yui_yahoo_dom_event_url);
        yui_connection_content = readContent(yui_connection_url);
        yui_get_content = readContent(yui_get_url);
        yui_animation_content = readContent(yui_animation_url);
        yui_json_content = readContent(yui_json_url);

        globalContent = readContent(global_url);
        loginContent = readContent(login_url);
        buildingContent = readContent(building_url);
        xitarContent = readContent(xitar_url);
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="SET methods. empty">
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="GET methods.">
    public String getStaticContent(Player player) {
        int se = 0;
        try {
            se = player.getAccessSequence();
        } catch (Exception e) {
        }

        StringBuilder contents = new StringBuilder();

        switch (se) {
            case 0:
                contents.append(yui_yahoo_dom_event_content).append(yui_connection_content).append(yui_get_content);
                break;
            case 1:
                contents.append(yui_yahoo_dom_event_content).append(yui_connection_content).append(yui_get_content).append(yui_json_content);
                break;
            case 2:
                contents.append(yui_yahoo_dom_event_content).append(yui_connection_content).append(yui_get_content).append(yui_json_content);
                break;
            case 3:
                contents.append(yui_yahoo_dom_event_content).append(yui_connection_content).append(yui_get_content).append(yui_json_content);
                break;
            case 4:
                contents.append(yui_yahoo_dom_event_content).append(yui_connection_content).append(yui_get_content).append(yui_animation_content).append(yui_json_content);
                break;
            default:
                contents.append(content);
                break;
        }

        return contents.toString();
    }

    public String getVarContent(Player player) {
        int se = 0;
        try {
            se = player.getAccessSequence();
        } catch (Exception e) {
        }

        StringBuilder contents = new StringBuilder();

        switch (se) {
            case 0:
                contents.append(globalContent).append(loginContent);
                break;
            case 1:
                contents.append(globalContent).append(buildingContent);
                break;
            case 2:
                contents.append(globalContent).append(buildingContent);
                break;
            case 3:
                contents.append(globalContent).append(buildingContent);
                break;
            case 4:
                contents.append(globalContent).append(xitarContent);
                break;
            default:
                contents.append("error");
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
                    contents.append(line + "\n");
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
