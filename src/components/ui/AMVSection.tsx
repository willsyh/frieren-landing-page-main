import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AMVVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  description?: string;
  duration?: string;
}

export default function AMVSection() {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<AMVVideo | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Data AMV videos - ganti dengan video Anda
  const amvVideos: AMVVideo[] = [
    {
      id: "1",
      title: "Frieren the Slayer",
      thumbnail: "/tumbnail/FrierentheSlayereef.png", // atau .png sesuai format
      videoUrl: "/AMV/FrierentheSlayereef.mp4", // nama file video Anda
      description: "by eef",
      duration: "00:21",
    },
    {
      id: "2",
      title: "more frieren angst? yes",
      thumbnail: "/tumbnail/morefrierenangst.png",
      videoUrl: "/AMV/morefrierenangst.mp4",
      description: "by julia",
      duration: "00:31",
    },
    {
      id: "3",
      title: "2 Goats",
      thumbnail: "/tumbnail/2Goats.png",
      videoUrl: "/AMV/2Goats.mp4",
      description: "by Lucasla3",
      duration: "00:19",
    },
    {
      id: "4",
      title: "I got lazy at the end lol",
      thumbnail: "/tumbnail/Igotlazyattheendlol.png",
      videoUrl: "/AMV/Igotlazyattheendlol.mp4",
      description: "by soldmyphone",
      duration: "01:01",
    },
    {
      id: "5",
      title: "back at it with another sad",
      thumbnail: "/tumbnail/backatitwithanothersad.png",
      videoUrl: "/AMV/backatitwithanothersad.mp4",
      description: "by julia",
      duration: "01:01",
    },
    {
      id: "6",
      title: "run to me",
      thumbnail: "/tumbnail/runtome.png",
      videoUrl: "/AMV/runtome.mp4",
      description: "by iva",
      duration: "00:12",
    },
  ];

  const openVideoModal = (video: AMVVideo) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  const toggleVideoMute = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <section id="amv" className="w-full min-h-screen bg-black py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-purple-700/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title with Purple Background */}
        <div className="relative mb-10 md:mb-16">
          {/* Background ungu di belakang tulisan AMV Collection */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[280px] md:w-[460px] h-[30px] md:h-[40px] bg-gradient-to-t from-purple-600/20 to-purple-400/10 rounded-lg blur-sm"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-amber-50 mb-4 relative z-20">
              {t("AMVCollection")}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto relative z-20 px-4">
              {t("AMVDescription")}
            </p>
          </motion.div>
        </div>

        {/* AMV Grid - Show only 3 initially */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {amvVideos
            .slice(0, showAll ? amvVideos.length : 3)
            .map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openVideoModal(video)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-900 shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/25">
                  {/* Thumbnail */}
                  <div className="aspect-video relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-purple-600 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-50 mb-2 group-hover:text-purple-300 transition-colors">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* See All / Show Less Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <span className="flex items-center gap-3">
              {showAll ? t("ShowLess") : t("SeeAllAMVs")}
              <ArrowRight
                className={`w-5 h-5 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-x-1"}`}
              />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Mute Button */}
              <button
                onClick={toggleVideoMute}
                className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                {isVideoMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>

              {/* Video Player */}
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                muted={isVideoMuted}
                className="w-full aspect-video"
                onEnded={closeVideoModal}
              >
                Your browser does not support the video tag.
              </video>

              {/* Video Info */}
              <div className="p-6 bg-gray-800">
                <h3 className="text-2xl font-bold text-amber-50 mb-2">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.description && (
                  <p className="text-gray-300">{selectedVideo.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
