/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes;

import java.util.Date;

import com.nm114.xitar.classes.xitar.*;
import com.nm114.xitar.servlets.*;
import com.nm114.xitar.exception.*;

/**
 *
 * @author brgd
 */
public class Desk {

    // <editor-fold defaultstate="collapsed" desc="VARIABLES.">
    // <editor-fold defaultstate="collapsed" desc="STATIC variables.">
    private static final int objLimit = CONFIG.getAllDeskNum();
    private static int objCount = 0;
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="OBJECT variables.">
    private int id = 0;
    private Room room = null;
    private Player player1 = null;
    private Player player2 = null;
    private XitarBoard xitarboard = null;
    private Boolean player2Confirmed = false;
    private int restrictId = -1;
    private long restrictTime = -1;
    private Boolean gameEnd = false;

    //</editor-fold>
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="METHODS.">
    // <editor-fold defaultstate="collapsed" desc="STATIC methods.">
    public static synchronized Desk getInstance(int num, Room room) throws CreateObjectOutOfLimit {
        if (objCount < objLimit) {
            ++objCount;
            return new Desk(num, room);
        } else {
            throw new CreateObjectOutOfLimit("Create Desk object Out of limit.");
        }
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="INITIAL methods.">
    private Desk(int num, Room room) {
        id = num;
        this.room = room;
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="SET methods.">
    private void setRestrictId(int playerid) {
        if (playerid != -1) {
            restrictId = playerid;
            restrictTime = (new Date()).getTime();
        } else {
            restrictId = -1;
            restrictTime = -1;
        }
    }

    public void setPlayersAction(int action) {
        if (action == CONFIG.ACTION_XITAR_END) {
            this.gameEnd = true;
        }
        if (player1 != null) {
            player1.setAction(action);
        }
        if (player2 != null) {
            player2.setAction(action);
        }
    }

    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="GET methods.">
    public int getId() {
        return id;
    }

    public Room getRoom() {
        return room;
    }

    public Boolean getGameEnd() {
        return gameEnd;
    }

    public String getUrl() {
        return DeskServlet.getUrl() + "/" + this.room.getId() + CONFIG.ROOM_DESK_SEPERATOR + id;
    }

    public XitarBoard getXitarBoard() {
        return xitarboard;
    }

    public String getPlayersIdInJSON() {
        int id1 = -1;
        int id2 = -1;

        try {
            id1 = player1.getId();
        } catch (Exception e) {
        }

        try {
            id2 = player2.getId();
        } catch (Exception e) {
            if (player2Confirmed == true) {
                id2 = 0;
            }
        }

        StringBuilder players = new StringBuilder("[" + id1 + "," + id2 + "]");
        //System.out.println(players.toString());
        return players.toString();
    }

    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="IS methods.">
    public Boolean isFirstPlayer(Player player) {
        if (player == player1) {
            return true;
        }
        return false;
    }

    public Boolean isplayer2Confirmed() {
        return player2Confirmed;
    }

    public Boolean isPlayerRestricted(int playerid) {
        if (restrictTime != -1) {
            long timePeriod = (new Date()).getTime() - restrictTime;
            if (CONFIG.PLAYER_RESTRICT_TIME < timePeriod) {
                setRestrictId(-1);
                return false;
            } else {
                if (restrictId != playerid) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        return false;
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="ADD methods.">
    public synchronized Boolean addPlayer(Player player) {
        if (player1 == null) {
            player1 = player;
            player.setDesk(this);
            return true;
        }
        if ((player2 == null) && (!isPlayerRestricted(player.getId()))) {
            this.setRestrictId(-1);
            player2 = player;
            player.setDesk(this);
            return true;
        }
        return false;
    }

    public Boolean addPlayerConfirm(Player player, int agree) {
        if (player == player1) {
            if (player2 != null) {
                if (agree != 0) {
                    addXitarBoard();
                    return true;
                } else {
                    setRestrictId(player2.getId());
                    player2.setDesk(null);
                    player2 = null;
                    return true;
                }
            }
        }
        return false;
    }

    public Boolean addXitarBoard() {
        try {
            player2Confirmed = true;
            xitarboard = XitarBoard.getInstance(this);
            player1.setAccessSequence(XitarServlet.SERVLET_ID);
            player2.setAccessSequence(XitarServlet.SERVLET_ID);
            return true;
        } catch (CreateObjectOutOfLimit e) {
            e.printStackTrace();
            return false;
        }

    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="DELETE methods.">
    public Boolean deletePlayer(Player Tplayer) {
        if (player1 == Tplayer) {
            if (player2 != null) {
                player1 = player2;
                player2 = null;
            } else {
                player1 = null;
                player2Confirmed = false;
            }
            return true;
        }
        if (player2 == Tplayer) {
            player2 = null;
            return true;
        }

        return false;
    }

    public void deleteXitarBoard() {
        player2Confirmed = false;
        xitarboard = null;
    }
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="other methods.">
    public void playerExit(Player Tplayer) {
        if ((player1 != null) || (player2 != null)) {
            //deleteXitarBoard();
            Tplayer.deleteDesk();
            gameEnd = false;
            Tplayer.setAccessSequence(RoomServlet.SERVLET_ID);
            //player1.setAccessSequence(DeskServlet.SERVLET_ID);
        }
    }
    //</editor-fold>
    //</editor-fold>
}
