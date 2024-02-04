import { HTMLAttributes, useRef } from 'react';
import { useXarrow } from 'react-xarrows';
import Draggable from 'react-draggable';

export const boxStyle = {
    border: '1px #999 solid',
    borderRadius: '10px',
    textAlign: 'center',
    width: '100px',
    height: '30px',
    color: 'black',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
} as const;

export const DraggableBox = ({ initialOffset = undefined, id, ...style }: {
    initialOffset?: { x: number; y: number; } | undefined;
}
    & HTMLAttributes<HTMLDivElement>) => {

    const ref = useRef<HTMLDivElement>(null);

    const updateXarrow = useXarrow();

    let moreStyle = {};
    if (initialOffset) {
        moreStyle = { position: 'absolute', left: initialOffset.x, top: initialOffset.y };
    }

    return (
        <Draggable
            onDrag={updateXarrow}
            onStop={updateXarrow}
            nodeRef={ref}
        >
            <div ref={ref} style={{ ...boxStyle, ...style, ...moreStyle }}>
                {id}
            </div>
        </Draggable>
    );
};
