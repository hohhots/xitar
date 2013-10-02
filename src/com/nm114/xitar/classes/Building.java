/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes;

import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class Building {

    private static Room[] rooms = setRooms();

    // <editor-fold defaultstate="collapsed" desc="METHODS.">
    // <editor-fold defaultstate="collapsed" desc="STATIC methods.">
    private static Room[] setRooms() {
        int z = CONFIG.ROOMNUM;
        Room[] r = new Room[z];

        int i;
        try {
            for (i = 0; i < z; i++) {
                r[i] = Room.getInstance(i);
            }
        } catch (CreateObjectOutOfLimit e) {
            e.printStackTrace();
        }

        return r;
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="INITIAL methods.">
    private Building() {//don't allow to create object
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="GET methods.">
    public static Room[] getRooms() {
        return rooms;
    }

    public static Room getRoom(int id) {
        return rooms[id];
    }

    public static String getRoomsStatus() {

        StringBuilder players = new StringBuilder("[");

        for (int i = 0; i < rooms.length; i++) {
            players.append(rooms[i].getPlayers());
            if (i != (rooms.length - 1)) {
                players.append(",");
            }
        }
        players.append("]");
        return players.toString();
    }
    //</editor-fold>
    //</editor-fold>
}
