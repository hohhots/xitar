/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes.cache;

import com.nm114.xitar.classes.*;
import java.io.*;
import java.net.*;
import java.util.*;

import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class ReadImageFile extends ReadFile {
    //<editor-fold defaultstate="collapsed" desc="VARIABLES.">
    //<editor-fold defaultstate="collapsed" desc="STATIC variables.">
    private static int objCount = 0;
    private static final Set<String> suffix = new HashSet<String>();
    private static HashMap<String, byte[]> images = new HashMap<String, byte[]>();
    private static String absolutePath = null;
    //<editor-fold defaultstate="collapsed" desc="OBJECT variables. empty">
    //</editor-fold>
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="METHODS.">
    //<editor-fold defaultstate="collapsed" desc="STATIC methods.">
    public static synchronized ReadImageFile getInstance() throws CreateObjectOutOfLimit {
        if (objCount < objLimit) {
            ++objCount;
            return new ReadImageFile();
        } else {
            throw new CreateObjectOutOfLimit("Create ReadCssFile object Out of limit.");
        }
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="INITIAL methods.">
    private ReadImageFile() {
        suffix.add("gif");
        suffix.add("jpg");
        suffix.add("png");

        URL location;
        String classLocation = ReadHtmlFile.class.getName().replace('.', '/') + ".class";
        ClassLoader loader = ReadHtmlFile.class.getClassLoader();
        location = loader.getResource(classLocation);
        String stl = location.toString();
        String t = stl.substring(stl.indexOf('/'), stl.lastIndexOf(classLocation) - 1);
        if (t.indexOf(":/") != -1) { //windows
            t = t.substring(t.indexOf('/') + 1);
        }
        absolutePath = t.substring(0, t.lastIndexOf('/') + 1) + "web/images/";

        readContent();
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="SET methods. empty">
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="GET methods.">
    public byte[] getContent(Player player, String filename) {
        int se = 0;
        try {
            se = player.getAccessSequence();
        } catch (Exception e) {
        }

        byte[] image = null;

        switch (se) {
            case 0://login

                break;
            case 1://building
                image = images.get("building/" + filename);
                break;
            case 2://building
                image = images.get("building/" + filename);
                break;
            case 3://building
                image = images.get("building/" + filename);
                break;
            case 4://xitar
                image = images.get("xitar/" + filename);
                break;
            default://error

                break;
        }

        return image;
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

    public void readContent() {
        listPath(new File(absolutePath));
    }
    //

    private void listPath(File path) {
        File[] files = path.listFiles();
        for (int i = 0, n = files.length; i < n; i++) {
            String name = "";
            if (files[i].isDirectory()) {
                listPath(files[i]);
            } else {
                String t = files[i].getName();
                t = t.substring(t.lastIndexOf(".") + 1);
                if (suffix.contains(t.toLowerCase())) {
                    name = files[i].getParentFile().getName() + "/" + files[i].getName();
                    byte[] result = new byte[(int) files[i].length()];
                    try {
                        FileInputStream in = new FileInputStream(files[i].getAbsolutePath());
                        in.read(result);
                    } catch (Exception ex) {
                        System.out.println("Exception caught: " + ex.getMessage());
                    }
                    images.put(name, result);
                }
            }
        }
    }
//</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="INNER OBJECTS. empty">
//</editor-fold>
}
