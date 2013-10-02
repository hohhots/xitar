/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes;

import java.util.*;

import com.nm114.xitar.servlets.*;
import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class Room {

    private static final int objLimit = CONFIG.ROOMNUM;
    private static int objCount = 0;
    private int id = 0;
    private ArrayList<Player> players = new ArrayList<Player>();
    private Desk[] desks = new Desk[CONFIG.DESKNUM];

    private Room(int num) {
        id = num;

        int z = CONFIG.DESKNUM;
        int i;
        try {
            for (i = 0; i < z; i++) {
                desks[i] = Desk.getInstance(i, this);
            }
        } catch (CreateObjectOutOfLimit e) {
            e.printStackTrace();
        }

    }

    public static synchronized Room getInstance(
            int num) throws CreateObjectOutOfLimit {
        if (objCount < objLimit) {
            ++objCount;
            return new Room(num);
        } else {
            throw new CreateObjectOutOfLimit("Create Room object Out of limit.");
        }
    }

    public int getId() {
        return id;
    }

    public String getUrl() {
        return RoomServlet.getUrl() + "/" + id;
    }

    public int getPlayers() {
        return players.size();
    }

    public Desk getDesk(int id) {
        return desks[id];
    }

    public Desk[] getDesks() {
        return desks;
    }

    public synchronized Boolean addPlayer(Player player) {
        if (!players.contains(player)) {
            players.add(player);
            player.setRoom(this);
            return true;
        }
        return false;
    }

    public Boolean deletePlayer(Player player) {
        if (players.contains(player)) {
            players.remove(player);
            player.deleteDesk();
            return true;
        }
        return false;
    }

    public String getDesksStatus() {
        StringBuilder players = new StringBuilder("[");

        for (int i = 0; i < desks.length; i++) {
            players.append(desks[i].getPlayersIdInJSON());
            if (i != (desks.length - 1)) {
                players.append(",");
            }
        }
        players.append("]");
        //System.out.println(players.toString());
        return players.toString();
    }

}
