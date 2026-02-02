import { Link, Outlet, useLocation, useParams } from "react-router";
import StickyBigTitele from "../components/StickyBigTitele";
import StickyWallNotes from "../components/StickyWallsNotes";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import Close from "../assets/close.svg";

export default function StickyWallSection() {
  const location = useLocation();
  const bgLocation = location.state?.bgLocation;
  const { stickyWalls, setStickyWalls } = useStickyWalls();
  const { stickyId } = useParams();
  const currentStickyWall = stickyWalls.find((sticky) => sticky.id == stickyId);

  const handleDeleteStickyWall = (e, wallId) => {
    e.preventDefault();
    e.stopPropagation();
    setStickyWalls((prev) => prev.filter((wall) => wall.id !== wallId));
  };

  const handleAddNewStickyWall = () => {
    window.__pendingOpenAddStickyWall = true;
    window.dispatchEvent(new Event("openSidebar"));
    setTimeout(() => {
      window.dispatchEvent(new Event("openAddStickyWall"));
    }, 50);
  };

  const colors = [
    "bg-[#98A7FD]",
    "bg-[#FFD1A3]",
    "bg-[#C8E6C9]",
    "bg-[#FFB7C5]",
    "bg-[#FFE08A]",
  ];
  const rotations = [
    "rotate-[-1deg]",
    "rotate-[0.5deg]",
    "rotate-[-0.5deg]",
    "rotate-[1deg]",
    "rotate-[-0.75deg]",
  ];

  return (
    <main className="flex min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-[30px] py-4 sm:py-6 md:py-[26px] flex-col items-start gap-6 sm:gap-8 bg-[#F6F8FA]">
      <StickyBigTitele
        sticky={currentStickyWall?.stickyName}
        time={currentStickyWall?.time}
        location={currentStickyWall?.location}
      />

      {currentStickyWall ? (
        <StickyWallNotes />
      ) : (
        <div className="flex flex-col w-full text-center">
          {stickyWalls.length > 0 ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4 font-poppins">
                Choose a Sticky Wall
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 font-poppins">
                Pick one of your sticky walls to view its notes.
              </p>
              <ul className="grid w-full grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-x-4 gap-y-6 sm:gap-y-8 items-start">
                {stickyWalls.map((wall, index) => {
                  return (
                    <li key={wall.id} className="relative">
                      <Link
                        to={`/sticky-wall/${wall.id}`}
                        className={`block w-full min-h-16 px-4 sm:px-5 pt-4 pb-6 sm:pb-8 rounded-1 shadow-[4px_4px_12px_rgba(0,0,0,0.15)] ${colors[index % colors.length]} ${rotations[index % rotations.length]} font-poppins text-lg sm:text-xl lg:text-2xl font-semibold text-black hover:shadow-[8px_8px_20px_rgba(0,0,0,0.25)] hover:scale-105 hover:rotate-0 transition-all duration-300`}
                      >
                        <div className="flex w-full justify-between items-center">
                          <span>{wall.stickyName}</span>
                          <button
                            onClick={(e) => handleDeleteStickyWall(e, wall.id)}
                            className="cursor-pointer rounded-2xl hover:bg-[#61616126] p-1"
                          >
                            <img src={Close} alt="Delete" className="w-8" />
                          </button>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2F090B] mb-3 sm:mb-4 font-poppins">
                No Sticky Walls Available
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 font-poppins">
                Create your first sticky wall to start organizing your notes.
              </p>
              <button
                type="button"
                onClick={handleAddNewStickyWall}
                className="px-6 py-3 bg-[#D7303A] text-white font-semibold font-poppins rounded-xl hover:bg-[#b32530] transition-colors"
              >
                Add New Sticky Wall
              </button>
            </>
          )}
        </div>
      )}

      {bgLocation && <Outlet />}
    </main>
  );
}
