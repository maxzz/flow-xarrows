import { CSSProperties } from "react";

export const canvasStyle: CSSProperties = {
    position: 'relative',
    height: '420px',
    background: 'ghostwhite',
    color: 'red',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
};

export const boxStyle: CSSProperties = {
    position: 'relative',
    padding: '12px 4px',
    width: '100px',
    height: '30px',
    borderRadius: '6px',
    border: '1px #999 solid',

    userSelect: 'none',
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
