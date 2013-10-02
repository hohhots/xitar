/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes.cache;

import java.io.*;
import java.net.*;
import java.util.regex.*;

import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class ReadHtmlFile extends ReadFile {

    private static int objCount = 0;
    private static String absolutePath = null;
    //
    private static final String errorUrl = "error.html";
    private static final String loginUrl = "login.html";
    private static final String buildingUrl = "building.html";
    private static final String xitarUrl = "xitar.html";
    private static String errorContent = null;
    private static String loginContent = null;
    private static String buildingContent = null;
    private static String xitarContent = null;

    private ReadHtmlFile() {

        URL location;
        String classLocation = ReadHtmlFile.class.getName().replace('.', '/') + ".class";
        ClassLoader loader = ReadHtmlFile.class.getClassLoader();
        location = loader.getResource(classLocation);
        String stl = location.toString();
        String t = stl.substring(stl.indexOf('/'), stl.lastIndexOf(classLocation) - 1);
        if (t.indexOf(":/") != -1) { //windows
            t = t.substring(t.indexOf('/') + 1);
        }
        absolutePath = t.substring(0, t.lastIndexOf('/') + 1) + "web/";

        errorContent = readContent(errorUrl);
        loginContent = readContent(loginUrl);
        buildingContent = readContent(buildingUrl);
        xitarContent = readContent(xitarUrl);
    }

    public static synchronized ReadHtmlFile getInstance() throws CreateObjectOutOfLimit {
        if (objCount < objLimit) {
            ++objCount;
            return new ReadHtmlFile();
        } else {
            throw new CreateObjectOutOfLimit("Create ReadHtmlFile object Out of limit.");
        }
    }

    private String readContent(String name) {
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
                content = removeHtmlComment(contents.toString());
                input.close();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return content;
    }

    public String removeHtmlComment(String st) {

        int origLength = 1;
        int newLength = 0;
        while (origLength > newLength) {
            origLength = st.length();
            st = st.replaceAll("(<!){1}(\\s)*-{1}(\\s)*-{1}(\\s)*([^(<!)>])*(\\s)*-{1}(\\s)*-{1}(\\s)*(>){1}", ""); //replace "<!-- s<!-- sdf -->df -->" with ""
            newLength = st.length();
        }

        st = this.removeSpace(st);
        return st;
    }

    public String removeSpace(String st) {

        st = st.replaceAll("(\\s)+(<){1}", "<");
        st = st.replaceAll("(>){1}(\\s)+", ">");

        return st;
    }

    public String getContent(String st) {
        String s = errorContent;

        if (st.equals("login")) {
            s = loginContent;
        }
        if (st.equals("building")) {
            s = buildingContent;
        }
        if (st.equals("xitar")) {
            s = xitarContent;
        }

        return s;
    }
}
