/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes;

/**
 *
 * @author brgd
 */
public class CONFIG {

    // <editor-fold defaultstate="collapsed" desc="VARIABLES.">
    // <editor-fold defaultstate="collapsed" desc="STATIC variables.">
    public static final Boolean DEBUG = false;

    public static final int SESSIONOUTTIME = 40;
    public static final int COMETEXPIRATIONDELAY = 30;
    public static final int ROOMNUM = 2;
    public static final int DESKNUM = 20;
    //
    public static final int XITAR_WHITE = 1; //white side xitar id
    public static final int XITAR_BLACK = 0; //black side xitar id
    public static final long PLAYER_RESTRICT_TIME = 10000; //10 second
    //
    public static final int ACTION_BUILDING = 0;
    public static final int ACTION_ROOM = 1;
    public static final int ACTION_DESK = 2;
    public static final int ACTION_XITAR_LASTSTEP = 3;
    public static final int ACTION_XITAR_EXIT = 4;
    public static final int ACTION_XITAR_END = 5;
    //
    public static final String REFRESH = "refresh";
    public static final String ENDGAME = "endgame";
    public static final String NO_ACESS_RIGHT = "error";
    public static final String BUILDING_VAR = "building";
    public static final String PLAYERS_VAR = "players";
    public static final String ROOMNUM_CLASS = "room_num";
    public static final String PLAYERS_CLASS = "players";
    public static final String PLAYERNAME = "player";
    public static final int BLACK_USER = 0;
    public static final int WHITE_USER = 1;
    public static final int cellsNum = 64;
    public static final int chessTypeNum = 6;
    public static final String ROOM_DESK_SEPERATOR = "d";

    // </editor-fold>
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="METHODS.">
    // <editor-fold defaultstate="collapsed" desc="STATIC methods.">
    public static int getUsersNum() {
        return ROOMNUM * DESKNUM * 2;
    }

    public static int getAllDeskNum() {
        return ROOMNUM * DESKNUM;
    }

    public static int getAllCellNum() {
        return getAllDeskNum() * cellsNum;
    }

    public static int getAllChessNum() {
        return getAllDeskNum() * cellsNum;
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="INITIAL methods.">
    private CONFIG() { //don't allow to create object
    }
    //</editor-fold>
    // </editor-fold>
}
