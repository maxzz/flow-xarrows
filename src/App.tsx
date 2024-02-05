import { DraggableBox } from "./components/DraggableBox";
import { CustomizeArrow } from "./examplesFiles/example-7-CustomizeArrow";
import { FewArrows } from "./examplesFiles/example-6-FewArrows";

export function App() {
    return (
        <>
            <div style={{ fontFamily: "sans-serif", fontSize: "1rem", display: "flex", flexDirection: "column" }}>
                <div style={{ position: 'relative' }}>
                    <DraggableBox id={"55"} />
                </div>
                <div style={{ position: 'relative' }}>
                    <FewArrows />
                </div>
                <div style={{ position: 'relative' }}>
                    <CustomizeArrow />
                </div>
            </div>
        </>
    );
}
