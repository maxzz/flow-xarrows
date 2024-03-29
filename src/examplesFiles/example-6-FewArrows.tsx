import { forwardRef, useRef, useState } from 'react';
import Xarrow, { useXarrow, xarrowPropsType, Xwrapper } from 'react-xarrows';
import Draggable from 'react-draggable';
import { mergeRefs } from '../utils/merge-refs';
import { boxStyle, canvasStyle } from './ui';

const DraggableBox = forwardRef<HTMLDivElement, { box: BoxPos; }>(
    ({ box }, outRef) => {
        const updateXarrow = useXarrow();

        // console.log(box.id, 'render');
        const ref = useRef<HTMLDivElement>(null);

        return (
            <Draggable
                onDrag={updateXarrow}
                onStop={updateXarrow}
                nodeRef={ref}
            >
                {/* <div className=""> */}
                    <div ref={mergeRefs([ref, outRef])} id={box.id} style={{ ...boxStyle, position: 'absolute', left: box.x, top: box.y }}>
                        {box.id}
                    </div>
                {/* </div> */}
            </Draggable>
        );
    }
);

type BoxPos = { id: string, x: number, y: number; };

export function FewArrows() {

    const [boxes] = useState<BoxPos[]>(() => ([
        { id: 'box1', x: 50, y: 20 },
        { id: 'box2', x: 160, y: 250 },
        { id: 'box3', x: 350, y: 80 },
    ]));

    const [lines] = useState<xarrowPropsType[]>(() => ([
        {
            start: 'box1',
            end: 'box2',
            headSize: 6,
            labels: { end: 'Arrow1: end' },
        },
        {
            start: 'box2',
            end: 'box3',
            color: 'red',
            strokeWidth: 1,
            headSize: 0,
            labels: {
                middle: (
                    <div contentEditable suppressContentEditableWarning={true} style={{ color: 'purple' }}>
                        Editable label
                    </div>
                ),
            },
        },
        {
            start: 'box3',
            end: 'box1',
            color: 'forestgreen',
            path: 'grid',
            endAnchor: ["right", { position: "left", offset: { y: -10 } }],
            dashness: { animation: 1 },
        },
    ]));

    return (<>
        <h3>
            Example1:
        </h3>
        <p>
            Automatic anchoring to the minimal length. <br />
            Works also when inside scrollable window. <br />
            Drag the boxes to play around.
        </p>

        <div style={canvasStyle}>
            <Xwrapper>

                {boxes.map((box, idx) => (
                    <DraggableBox box={box} key={idx} />
                ))}

                {lines.map((line, idx) => (
                    <Xarrow key={idx} {...line} />
                ))}

            </Xwrapper>
        </div>
    </>);
}
