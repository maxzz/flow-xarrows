import { DraggableBox } from "./components/DraggableBox";
import { CustomizeArrow } from "./examplesFiles/example-7-CustomizeArrow";
import { FewArrows } from "./examplesFiles/example-6-FewArrows";

export function App() {
    return (
        <>
            <div>
                <DraggableBox id={"55"} />
                <FewArrows />
                <div style={{ position: 'relative'}}>
                <CustomizeArrow />
                </div>
            </div>
        </>
    );
}
