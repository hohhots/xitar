/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nm114.xitar.classes.xitar;

/**
 *
 * @author brgd
 */
public class Teme extends Xitar {

    //<editor-fold defaultstate="collapsed" desc="VARIABLES.">
    //<editor-fold defaultstate="collapsed" desc="STATIC variables.">
    public static final int id = 3;
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="OBJECT variables. empty">
    //</editor-fold>
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="METHODS.">
    //<editor-fold defaultstate="collapsed" desc="STATIC methods. empty">
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="INITIAL methods.">
    public Teme(int side) {
        this.side = side;
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="SET methods. empty">
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="GET methods.">
    public int getId(){
        return id;
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

    //<editor-fold defaultstate="collapsed" desc="Other methods.">
    protected Boolean moveToCellRule(Cell tcell) {
        int fid = this.cell.getId();
        int tid = tcell.getId();

        int fidx = (fid % 8);                    //x position
        int fidy = ((fid - (fid % 8)) / 8);   //y position
        int tidx = (tid % 8);                   //x position
        int tidy = ((tid - (tid % 8)) / 8);  //y position

        if ((fidx != tidx) || (fidy != tidy)) {
            if (Math.abs(fidx - tidx) == Math.abs(fidy - tidy)) {
                if (this.clear(tcell)) {
                    return true;
                }
            }
        }
        return false;
    }

    protected Boolean moveToChessRule(Cell tcell) {
        return this.moveToCellRule(tcell);
    }

    private Boolean clear(Cell tcell) {

        int fid = this.cell.getId(); //3
        int tid = tcell.getId();      //19
        int d = fid - tid;

        int step = 7; //horizontal move
        if (d % 9 == 0) {
            step = 9;
        }
        if (d > 0) {
            step = -step;
        }

        int len = Math.abs(d / step);
        for (int i = 1; i < len; i++) {
            if (this.xitarboard.getCell(fid + (step * i)).hasXitar()) {
                return false;
            }
        }

        return true;
    }
    //</editor-fold>
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="INNER OBJECTS. empty">
    //</editor-fold>
}