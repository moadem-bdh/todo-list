import { useParams } from "react-router";
import StickyWall from "../components/StickyWall";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import AddstickyNote from "./AddStickyNote";

export default function StickyWallNotes (){
    const {stickyWalls} = useStickyWalls()
    const {stickyId} = useParams()
    const currentNotes = stickyWalls.find((sticky)=> sticky.id == stickyId )
return( 

<section className=" w-full  grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-x-4 gap-y-8 items-start " >
    


     { currentNotes.notes.map((note)=> <StickyWall key={note.id}  NoteName ={note.title} NoteContent={note.details} id={note.id} bgColor={note.bgColor} /> ) }

    
    <AddstickyNote/>
</section>


);


}