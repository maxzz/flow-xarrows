import { useState, useRef, HTMLAttributes, ReactNode, CSSProperties } from 'react';
import Xarrow, { anchorType, arrowShapes, pathType, svgCustomEdgeType, svgEdgeShapeType, useXarrow, xarrowPropsType, Xwrapper } from 'react-xarrows';
import Draggable from 'react-draggable';
import NumericInput from 'react-numeric-input';
import Collapsible, { CollapsibleProps } from 'react-collapsible';

const canvasStyle: CSSProperties = {
    width: '100%',
    height: '60vh',
    background: 'white',
    overflow: 'auto',
    display: 'flex',
    position: 'relative',
    color: 'black',
};

const boxStyle: CSSProperties = {
    position: 'absolute',
    background: 'white',
    border: '1px #999 solid',
    borderRadius: '10px',
    textAlign: 'center',
    width: '100px',
    height: '30px',
    color: 'black',
};

const centeredFlex: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const colorOptions = ['red', 'BurlyWood', 'CadetBlue', 'Coral'];
const bodyColorOptions = [null, ...colorOptions];
const anchorsTypes = ['left', 'right', 'top', 'bottom', 'middle', 'auto'];

// one row div with elements centered
const Div = ({ children, style = {}, ...rest }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div style={{ width: '100%', ...centeredFlex, ...style, }} {...rest}>
            {children}
        </div>
    );
};

const MyCollapsible = ({ children, style = {}, title = 'title', ...rest }: { children?: ReactNode; style?: CSSProperties; title?: string; } & Omit<CollapsibleProps, 'trigger'>) => {
    return (
        <Collapsible
            open={false}
            trigger={title}
            transitionTime={100}
            containerElementProps={{ style: { border: '1px #999 solid', }, }}
            triggerStyle={centeredFlex}
            {...rest}
        >
            {children}
        </Collapsible>
    );
};

// not in single line
const CollapsibleDiv = ({ children, style = {}, title = 'title', ...rest }: { children?: ReactNode; style?: CSSProperties; title?: string; } & HTMLAttributes<HTMLDivElement>) => {
    return (
        <Collapsible
            open={false}
            trigger={title}
            transitionTime={100}
            containerElementProps={{ style: { border: '1px #999 solid', }, }}
            triggerStyle={centeredFlex}
        >
            <Div {...{ children, style, ...rest }}>
                {children}
            </Div>
        </Collapsible>
    );
};

const Box = (props: { box: BoxPos; }) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <div ref={props.box.ref} id={props.box.id} style={{ ...boxStyle, left: props.box.x, top: props.box.y }}>
                {props.box.id}
            </div>
        </Draggable>
    );
};

const ArrowAnchor = ({ anchorName, edgeAnchor, setAnchor }: { anchorName: string, edgeAnchor: string[], setAnchor: React.Dispatch<React.SetStateAction<string[]>>; }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
            <p>{anchorName}: </p>
            <div>
                {anchorsTypes.map((anchor, i) => (
                    <div style={{ display: 'flex', alignItems: 'center', height: 25, }} key={i}>
                        <p>
                            {anchor}
                        </p>
                        <input
                            type="checkBox"
                            style={{ height: '15px', width: '15px' }}
                            checked={edgeAnchor.includes(anchor)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setAnchor([...edgeAnchor, anchor]);
                                } else {
                                    let a = [...edgeAnchor];
                                    a.splice(edgeAnchor.indexOf(anchor), 1);
                                    setAnchor(a);
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

type ArrowShapeType = {
    svgElem: JSX.Element;
    offsetForward: number;

};
type ArrowShapeKeys = keyof typeof arrowShapes;

const ArrowEdge = ({ edgeName, setEdge, edgeSize, setEdgeSize, showEdge, setShowEdge, edgeShape, setEdgeShape }: {
    edgeName: string;
    setEdge: (v: string) => void;
    edgeSize: number;
    setEdgeSize: (v: number | null) => void;
    showEdge: boolean;
    setShowEdge: (v: boolean) => void;
    edgeShape: string;
    setEdgeShape: (v: ArrowShapeType | ArrowShapeKeys) => void;
}
) => {
    const predefinedShapes = Object.keys(arrowShapes) as ArrowShapeKeys[];
    const [selectedShape, setSelectedShape] = useState<ArrowShapeKeys>(predefinedShapes[0]);
    const [adv, setAdv] = useState(false);

    const [edgeOffset, setEdgeOffset] = useState<number>(arrowShapes[predefinedShapes[0]].offsetForward);
    const [svgElem, setSvgElem] = useState(arrowShapes[predefinedShapes[0]].svgElem);

    function handleMenuSelectShape(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedShape = e.target.value as ArrowShapeKeys;
        setSelectedShape(selectedShape);
        update({ shape: selectedShape });
    }

    function onAdvOpen() {
        setAdv(true);
        update({ _adv: true });
    }

    function onAdvClose() {
        setAdv(false);
        update({ _adv: false });
    }

    function update({ shape = selectedShape, offsetForward = edgeOffset, _adv = adv, _svgElem = svgElem }) {
        if (_adv) {
            setEdgeShape({ ...arrowShapes[shape], offsetForward: offsetForward, svgElem: _svgElem });
        }
        else {
            setEdgeShape(shape);
        }
    }

    return (
        <Div title={'arrow ' + edgeName}>
            <b>{edgeName}: </b>
            
            <p>show: </p>
            <input
                type="checkBox"
                checked={showEdge}
                onChange={(e) => setShowEdge(e.target.checked)}
                style={{ height: '15px', width: '15px' }}
            />
            
            <p> color: </p>
            <select style={{ marginRight: 10 }} onChange={(e) => setEdge(e.target.value)}>
                {bodyColorOptions.map((o, i) => (
                    <option key={i}>{o}</option>
                ))}
            </select>
            
            <p>size: </p>
            <NumericInput value={edgeSize} onChange={(val) => setEdgeSize(val)} style={{ input: { width: 60 } }} />

            <p>shape: </p>
            <select onChange={handleMenuSelectShape}>
                {predefinedShapes.map((o, i) => (
                    <option key={i}>{o}</option>
                ))}
            </select>

            {/*<MyCollapsible title={'advanced'} onOpen={onAdvOpen} onClose={onAdvClose}>*/}
            {/*  /!*<Div>*!/*/}
            {/*  <p>{edgeName}Offset: </p>*/}
            {/*  <NumericInput*/}
            {/*    value={edgeOffset}*/}
            {/*    onChange={(val) => {*/}
            {/*      setEdgeOffset(val);*/}
            {/*      update({ offsetForward: val });*/}
            {/*    }}*/}
            {/*    style={{ input: { width: 70 } }}*/}
            {/*    step={0.01}*/}
            {/*  />*/}
            {/*</MyCollapsible>*/}
        </Div>
    );
};

const ArrowLabel = ({ labelName, label, setLabel }) => {
    return (
        <Div>
            <p>{labelName} label:</p>
            <input style={{ width: '120px' }} type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
        </Div>
    );
};

type BoxPos = { id: string, x: number, y: number; ref: any; };

export function CustomizeArrow() {
    const [showMe, setShowMe] = useState(true);

    const box: BoxPos = { id: 'box1', x: 20, y: 20, ref: useRef(null), };
    const box2: BoxPos = { id: 'box2', x: 320, y: 120, ref: useRef(null), };

    const [color, setColor] = useState('red');
    const [lineColor, setLineColor] = useState<string | null>(null);
    const [showArrow, setShowArrow] = useState(true);
    const [showHead, setShowHead] = useState(true);
    const [headColor, setHeadColor] = useState(null);
    const [headSize, setHeadSize] = useState<number | undefined>(6);
    const [showTail, setShowTail] = useState(false);
    const [tailColor, setTailColor] = useState(null);
    const [tailSize, setTailSize] = useState(6);
    const [curveness, setCurveness] = useState<number | undefined>(0.8);
    const [strokeWidth, setStrokeWidth] = useState<number | undefined>(4);
    const [startAnchor, setStartAnchor] = useState<anchorType>(['auto']);
    const [endAnchor, setEndAnchor] = useState<anchorType>(['auto']);
    const [dashed, setDashed] = useState(false);
    const [animation, setAnimation] = useState<number | undefined>(1);
    const [path, setPath] = useState<pathType>('smooth');
    const [startLabel, setStartLabel] = useState("I'm start label");
    const [middleLabel, setMiddleLabel] = useState('middleLabel');
    const [endLabel, setEndLabel] = useState('fancy end label');
    const [_extendSVGcanvas, setExtendSVGcanvas] = useState<number | undefined>(0);
    const [_debug, set_Debug] = useState(false);
    const [_cpx1Offset, set_Cpx1] = useState<number | undefined>(0);
    const [_cpy1Offset, set_Cpy1] = useState<number | undefined>(0);
    const [_cpx2Offset, set_Cpx2] = useState<number | undefined>(0);
    const [_cpy2Offset, set_Cpy2] = useState<number | undefined>(0);
    const [animateDrawing, setAnimateDrawing] = useState<number | undefined>(1);
    const [enableAnimateDrawing, setEnableAnimateDrawing] = useState(false);
    const _animateDrawing = enableAnimateDrawing ? animateDrawing : false;
    const [headShape, setHeadShape] = useState<svgEdgeShapeType | svgCustomEdgeType>(Object.keys(arrowShapes)[0] as svgEdgeShapeType);
    const [tailShape, setTailShape] = useState<svgEdgeShapeType | svgCustomEdgeType>(Object.keys(arrowShapes)[0] as svgEdgeShapeType);
    // const [headOffset, setHeadOffset] = useState(0.25);
    // const [tailOffset, setTailOffset] = useState(0.25);
    // const headShape = { ...arrowShapes[headShape], ...{ offsetForward: headOffset } };
    // console.log(headOffset);

    const xarrowProps: xarrowPropsType = {
        // this is the important part of the example! play with the props to understand better the API options
        start: 'box1', //  can be string
        end: box2.ref, //  or reference
        startAnchor: startAnchor || [],
        endAnchor: endAnchor,
        curveness: Number(curveness),
        color: color,
        lineColor: lineColor,
        strokeWidth: Number(strokeWidth),
        dashness: dashed ? { animation: Number(animation) } : false,
        path: path,
        showHead: showHead,
        headColor: headColor,
        headSize: Number(headSize),
        headShape: headShape,
        tailShape: tailShape,
        showTail,
        tailColor,
        tailSize: Number(tailSize),
        labels: {
            start: startLabel,
            middle: middleLabel,
            end: (<div style={{ fontSize: '1.3em', fontFamily: 'fantasy', fontStyle: 'italic', color: 'purple', }}> {endLabel} </div>),
        },
        _extendSVGcanvas,
        _debug,
        _cpx1Offset: _cpx1Offset,
        _cpy1Offset: _cpy1Offset,
        _cpx2Offset: _cpx2Offset,
        _cpy2Offset: _cpy2Offset,
        animateDrawing: _animateDrawing,
    };

    return (
        <div>
            <h3>
                Example2:
            </h3>
            <p>
                This example shows some of the main API options. give the arrow diffrent properties to customize his look. note
                that some options are cannot be changed though this GUI(like custom lables or advande dashness and more) play
                with them directly at this codesandbox!.
            </p>

            {/*<button onClick={() => setShowMe(!showMe)}>toggle</button>*/}

            {showMe ? (
                <div>
                    <CollapsibleDiv title={'anchors'}>
                        <ArrowAnchor edgeAnchor={startAnchor} anchorName={'startAnchor'} setAnchor={setStartAnchor} />
                        <ArrowAnchor edgeAnchor={endAnchor} anchorName={'endAnchor'} setAnchor={setEndAnchor} />
                    </CollapsibleDiv>

                    <MyCollapsible title={'arrow apearance'} open={true}>
                        <Div>
                            <p>arrow color(all): </p>
                            <select style={{ height: '20px', marginRight: 10 }} onChange={(e) => setColor(e.target.value)}>
                                {colorOptions.map((o, i) => (
                                    <option key={i}>{o}</option>
                                ))}
                            </select>

                            <p>line color: </p>
                            <select onChange={(e) => setLineColor(e.target.value)}>
                                {bodyColorOptions.map((o, i) => (
                                    <option key={i}>{o}</option>
                                ))}
                            </select>

                            <p>strokeWidth: </p>
                            <NumericInput
                                value={strokeWidth}
                                onChange={(val) => setStrokeWidth(val || undefined)}
                                style={{ input: { width: 60 } }}
                            />
                        </Div>
                        <Div>
                            <p>curveness: </p>
                            <NumericInput
                                value={curveness}
                                onChange={(val) => setCurveness(val || undefined)}
                                step={0.1}
                                style={{ input: { width: 60 } }}
                            />

                            <p>animation: </p>
                            <NumericInput value={animation} onChange={(val) => setAnimation(val || undefined)} style={{ input: { width: 60 } }} />

                            <p>dashed: </p>
                            <input
                                style={{ height: '15px', width: '15px' }}
                                type="checkBox"
                                checked={dashed}
                                onChange={(e) => setDashed(e.target.checked)} />

                            <p>path: </p>
                            <select onChange={(e) => setPath(e.target.value)}>
                                {['smooth', 'grid', 'straight'].map((o, i) => (
                                    <option key={i}>{o}</option>
                                ))}
                            </select>
                        </Div>
                        <ArrowEdge
                            edgeName={'head'}
                            setEdge={setHeadColor}
                            edgeSize={headSize}
                            setEdgeSize={setHeadSize}
                            showEdge={showHead}
                            setShowEdge={setShowHead}
                            // edgeOffset={headOffset}
                            // setEdgeOffset={setHeadOffset}
                            edgeShape={headShape}
                            setEdgeShape={setHeadShape}
                        />
                        <ArrowEdge
                            edgeName={'tail'}
                            setEdge={setTailColor}
                            edgeSize={tailSize}
                            setEdgeSize={setTailSize}
                            showEdge={showTail}
                            setShowEdge={setShowTail}
                            // edgeOffset={tailOffset}
                            // setEdgeOffset={setTailOffset}
                            edgeShape={tailShape}
                            setEdgeShape={setTailShape}
                        />
                        <Div>
                            <p>show arrow: </p>
                            <input
                                style={{ height: '15px', width: '15px' }}
                                type="checkBox"
                                checked={showArrow}
                                onChange={(e) => {
                                    setShowArrow(e.target.checked);
                                }}
                            />
                            <p>animateDrawing(secs): </p>
                            <input
                                style={{ height: '15px', width: '15px' }}
                                type="checkBox"
                                checked={enableAnimateDrawing}
                                onChange={(e) => {
                                    setEnableAnimateDrawing(e.target.checked);
                                }}
                            />
                            <NumericInput
                                value={animateDrawing}
                                onChange={(val) => setAnimateDrawing(val || undefined)}
                                style={{ input: { width: 60 } }}
                                step={0.2}
                            />
                        </Div>
                    </MyCollapsible>

                    <CollapsibleDiv title={'labels'}>
                        <ArrowLabel labelName={'start'} label={startLabel} setLabel={setStartLabel} />
                        <ArrowLabel labelName={'middle'} label={middleLabel} setLabel={setMiddleLabel} />
                        <ArrowLabel labelName={'end'} label={endLabel} setLabel={setEndLabel} />
                    </CollapsibleDiv>

                    <MyCollapsible title={'advanced'}>
                        <Div>
                            <p>_extendSVGcanvas: </p>
                            <NumericInput
                                value={_extendSVGcanvas}
                                onChange={(val) => setExtendSVGcanvas(val || undefined)}
                                style={{ input: { width: 70 } }} />
                            <p>_debug</p>
                            <input
                                style={{ height: '15px', width: '15px' }}
                                type="checkBox"
                                checked={_debug}
                                // value={}
                                onChange={(e) => {
                                    set_Debug(e.target.checked);
                                }} />
                        </Div>
                        <Div>
                            <p>_cpx1Offset: </p>
                            <NumericInput
                                value={_cpx1Offset}
                                onChange={(val) => set_Cpx1(val || undefined)}
                                style={{ input: { width: 70 } }}
                                step={2} />

                            <p>_cpy1Offset: </p>
                            <NumericInput
                                value={_cpy1Offset}
                                onChange={(val) => set_Cpy1(val || undefined)}
                                style={{ input: { width: 70 } }}
                                step={2} />

                            <p>_cpx2Offset: </p>
                            <NumericInput
                                value={_cpx2Offset}
                                onChange={(val) => set_Cpx2(val || undefined)}
                                style={{ input: { width: 70 } }}
                                step={2} />

                            <p>_cpy2Offset: </p>
                            <NumericInput
                                value={_cpy2Offset}
                                onChange={(val) => set_Cpy2(val || undefined)}
                                style={{ input: { width: 70 } }}
                                step={2} />
                        </Div>
                    </MyCollapsible>
                    <br />
                    <div style={canvasStyle} id="canvas">
                        <Xwrapper>
                            <Box box={box} />
                            <Box box={box2} />
                            {showArrow
                                ? <Xarrow {...xarrowProps} />
                                : null
                            }
                        </Xwrapper>
                    </div>
                    {/*/!* todo: add generated code preview *!/ */}
                    {/*<pre>*/}
                    {/*  <code className="jsx">&lt;Index {}/&gt;</code>*/}
                    {/*</pre>*/}
                </div>
            ) : null}
        </div>
    );
}

