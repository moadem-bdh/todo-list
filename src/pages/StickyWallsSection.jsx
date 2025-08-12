import { Outlet, useLocation, useParams, Link } from "react-router";
import StickyBigTitele from "../components/StickyBigTitele";
import StickyWallNotes from "../components/StickyWallsNotes";
import { useStickyWalls } from "../Contexts/StickyWallContext";

export default function StickyWallSection() {
  const location = useLocation();
  const bgLocation = location.state?.bgLocation;
  const { stickyWalls } = useStickyWalls();
  const { stickyId } = useParams();
  const currentStickyWall = stickyWalls.find((sticky) => sticky.id == stickyId);

  return (
    <main className=" flex min-h-screen w-full px-[30px] py-[26px] flex-col items-end gap-8  bg-[#F6F8FA] ">
      <StickyBigTitele sticky={currentStickyWall?.stickyName} />

      {currentStickyWall ? (
        <StickyWallNotes />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh] text-center">
          <h2 className="text-3xl font-bold text-[#2F090B] mb-4 font-poppins">
            No Sticky Walls Available
          </h2>
          <p className="text-lg text-gray-600 mb-6 font-poppins">
            Create your first sticky wall to start organizing your notes.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-[#D7303A] text-white font-semibold font-poppins rounded-xl hover:bg-[#b32530] transition-colors"
          >
            Go Back to Home Page
          </Link>
        </div>
      )}

      {bgLocation && <Outlet />}
    </main>
  );
}
