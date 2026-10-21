/* =========================================================
   GEMS site content — edit this file to add or change
   experiments, podcast episodes and newsletter briefings.
   Every page that lists these reads from here.
   ========================================================= */

window.GEMS_DATA = {

  /* Numbers shown in the GEMS Lab stat boxes.
     "experiments" is counted automatically from the list below. */
  labStats: {
    plays: 6,          // "PLAYS" / "TOTAL PLAYS"
    studentViews: 3    // "STUDENTS" / "STUDENT VIEWS"
  },

  /* GEMS Lab experiment videos (newest first).
     image: thumbnail in assets/img/lab/
     video: a YouTube link or a video file path — leave "" until you have it */
  /* GEMS Lab experiment videos, in the order they appear on the GEMS Lab page.
     featured: true → also shown on the home page (all featured ones)
     views:    the play count shown on the card
     length:   video length shown on the thumbnail
     image:    thumbnail in assets/img/lab/
     video:    a Google Drive share link, a YouTube link, or a video file path */
  /* Testimonials page: one entry per school, shown in this order.
     name:  the school's name (the heading)
     place: shown under the name, e.g. "Gasabo District"
     media: photos and videos in assets/testimonials/school-NN/ (shown in this order;
            reorder or delete lines freely). An empty list shows "Coming soon" tiles. */
  testimonials: [
    {
      "school": 1,
      "name": "Lycée de Kigali (LDK)",
      "place": "Nyarugenge District",
      "media": [
        {"type": "photo", "src": "school-01/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-01/video-1.mp4", "poster": "school-01/video-1.webp", "duration": 7, "w": 540, "h": 960},
        {"type": "photo", "src": "school-01/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-01/video-2.mp4", "poster": "school-01/video-2.webp", "duration": 13, "w": 540, "h": 960},
        {"type": "photo", "src": "school-01/photo-3.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-01/video-3.mp4", "poster": "school-01/video-3.webp", "duration": 26, "w": 540, "h": 960},
        {"type": "photo", "src": "school-01/photo-4.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-01/photo-5.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 2,
      "name": "Saint Ignatius High School",
      "place": "Gasabo District",
      "media": [
        {"type": "photo", "src": "school-02/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-02/video-1.mp4", "poster": "school-02/video-1.webp", "duration": 8, "w": 540, "h": 960},
        {"type": "photo", "src": "school-02/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-02/video-2.mp4", "poster": "school-02/video-2.webp", "duration": 18, "w": 540, "h": 960},
        {"type": "photo", "src": "school-02/photo-3.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-02/video-3.mp4", "poster": "school-02/video-3.webp", "duration": 9, "w": 540, "h": 960},
        {"type": "photo", "src": "school-02/photo-4.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-02/video-4.mp4", "poster": "school-02/video-4.webp", "duration": 8, "w": 540, "h": 960},
        {"type": "video", "src": "school-02/video-5.mp4", "poster": "school-02/video-5.webp", "duration": 17, "w": 540, "h": 960}
      ]
    },
    {
      "school": 3,
      "name": "Glory Secondary School",
      "place": "Gasabo District",
      "media": [
        {"type": "photo", "src": "school-03/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-03/video-1.mp4", "poster": "school-03/video-1.webp", "duration": 20, "w": 540, "h": 960},
        {"type": "photo", "src": "school-03/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-03/video-2.mp4", "poster": "school-03/video-2.webp", "duration": 3, "w": 540, "h": 960},
        {"type": "photo", "src": "school-03/photo-3.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-03/video-3.mp4", "poster": "school-03/video-3.webp", "duration": 15, "w": 540, "h": 960},
        {"type": "photo", "src": "school-03/photo-4.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-03/photo-5.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-03/photo-6.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-03/photo-7.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-03/photo-8.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-03/photo-9.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-03/photo-10.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 4,
      "name": "APADE Lycée de Kicukiro",
      "place": "Kicukiro District",
      "media": [
        {"type": "photo", "src": "school-04/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-04/video-1.mp4", "poster": "school-04/video-1.webp", "duration": 13, "w": 540, "h": 960},
        {"type": "photo", "src": "school-04/photo-2.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-04/photo-3.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 5,
      "name": "Green Hills Academy",
      "place": "Gasabo District",
      "media": [
        {"type": "photo", "src": "school-05/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-05/video-1.mp4", "poster": "school-05/video-1.webp", "duration": 9, "w": 540, "h": 960},
        {"type": "photo", "src": "school-05/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-05/video-2.mp4", "poster": "school-05/video-2.webp", "duration": 10, "w": 540, "h": 960},
        {"type": "photo", "src": "school-05/photo-3.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-05/photo-4.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 6,
      "name": "King David Academy",
      "place": "Kicukiro District",
      "media": [
        {"type": "photo", "src": "school-06/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-06/video-1.mp4", "poster": "school-06/video-1.webp", "duration": 20, "w": 540, "h": 960},
        {"type": "photo", "src": "school-06/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-06/video-2.mp4", "poster": "school-06/video-2.webp", "duration": 19, "w": 540, "h": 960},
        {"type": "photo", "src": "school-06/photo-3.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-06/video-3.mp4", "poster": "school-06/video-3.webp", "duration": 46, "w": 540, "h": 960},
        {"type": "photo", "src": "school-06/photo-4.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-06/photo-5.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 7,
      "name": "Lycée Notre Dame de Cîteaux",
      "place": "Nyarugenge District",
      "media": [
        {"type": "photo", "src": "school-07/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-07/video-1.mp4", "poster": "school-07/video-1.webp", "duration": 31, "w": 540, "h": 960},
        {"type": "photo", "src": "school-07/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-07/video-2.mp4", "poster": "school-07/video-2.webp", "duration": 9, "w": 540, "h": 960},
        {"type": "photo", "src": "school-07/photo-3.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-07/photo-4.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-07/photo-5.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 8,
      "name": "FAWE Girls' School",
      "place": "Gasabo District",
      "media": [
        {"type": "photo", "src": "school-08/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-08/video-1.mp4", "poster": "school-08/video-1.webp", "duration": 20, "w": 540, "h": 960},
        {"type": "photo", "src": "school-08/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-08/video-2.mp4", "poster": "school-08/video-2.webp", "duration": 6, "w": 540, "h": 960},
        {"type": "photo", "src": "school-08/photo-3.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 9,
      "name": "Collège Saint André",
      "place": "Nyarugenge District",
      "media": [
        {"type": "photo", "src": "school-09/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-09/video-1.mp4", "poster": "school-09/video-1.webp", "duration": 18, "w": 402, "h": 720},
        {"type": "photo", "src": "school-09/photo-2.webp", "w": 720, "h": 1280},
        {"type": "photo", "src": "school-09/photo-3.webp", "w": 720, "h": 1280}
      ]
    },
    {
      "school": 10,
      "name": "IFAK Kimihurura (Institut de Formation Apostolique de Kimihurura)",
      "place": "Gasabo District",
      "media": [
        {"type": "photo", "src": "school-10/photo-1.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-10/photo-2.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-10/photo-3.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-10/photo-4.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 11,
      "name": "Nyamata High School",
      "place": "Bugesera District",
      "media": [
        {"type": "photo", "src": "school-11/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-11/video-1.mp4", "poster": "school-11/video-1.webp", "duration": 6, "w": 540, "h": 960},
        {"type": "photo", "src": "school-11/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-11/video-2.mp4", "poster": "school-11/video-2.webp", "duration": 18, "w": 540, "h": 960},
        {"type": "photo", "src": "school-11/photo-3.webp", "w": 788, "h": 1400},
        {"type": "photo", "src": "school-11/photo-4.webp", "w": 788, "h": 1400}
      ]
    },
    {
      "school": 12,
      "name": "École Technique St. Kizito Musha",
      "place": "Rwamagana District",
      "media": [
        {"type": "photo", "src": "school-12/photo-1.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-12/video-1.mp4", "poster": "school-12/video-1.webp", "duration": 14, "w": 540, "h": 960},
        {"type": "photo", "src": "school-12/photo-2.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-12/video-2.mp4", "poster": "school-12/video-2.webp", "duration": 16, "w": 540, "h": 960},
        {"type": "photo", "src": "school-12/photo-3.webp", "w": 788, "h": 1400},
        {"type": "video", "src": "school-12/video-3.mp4", "poster": "school-12/video-3.webp", "duration": 5, "w": 540, "h": 960}
      ]
    },
    {
      "school": 13,
      "name": "Orpcare School",
      "place": "Kayonza District",
      "media": [
        {"type": "photo", "src": "school-13/photo-1.webp", "w": 787, "h": 1400},
        {"type": "video", "src": "school-13/video-1.mp4", "poster": "school-13/video-1.webp", "duration": 42, "w": 406, "h": 720},
        {"type": "photo", "src": "school-13/photo-2.webp", "w": 787, "h": 1400},
        {"type": "video", "src": "school-13/video-2.mp4", "poster": "school-13/video-2.webp", "duration": 42, "w": 402, "h": 720},
        {"type": "photo", "src": "school-13/photo-3.webp", "w": 608, "h": 1080},
        {"type": "photo", "src": "school-13/photo-4.webp", "w": 608, "h": 1080},
        {"type": "photo", "src": "school-13/photo-5.webp", "w": 608, "h": 1080}
      ]
    },
    {
      "school": 14,
      "name": "St. Antoine Secondary School Karangazi",
      "place": "Nyagatare District",
      "media": [
        {"type": "photo", "src": "school-14/photo-1.webp", "w": 787, "h": 1400},
        {"type": "video", "src": "school-14/video-1.mp4", "poster": "school-14/video-1.webp", "duration": 31, "w": 406, "h": 720},
        {"type": "video", "src": "school-14/video-2.mp4", "poster": "school-14/video-2.webp", "duration": 5, "w": 406, "h": 720}
      ]
    },
    {
      "school": 15,
      "name": "G.S. Rubira",
      "place": "Kayonza District",
      "media": [
        {"type": "video", "src": "school-15/video-1.mp4", "poster": "school-15/video-1.webp", "duration": 17, "w": 540, "h": 960}
      ]
    },
    {
      "school": 16,
      "name": "Lycée de Zaza",
      "place": "Ngoma District",
      "media": [
        {"type": "photo", "src": "school-16/photo-1.webp", "w": 787, "h": 1400},
        {"type": "video", "src": "school-16/video-1.mp4", "poster": "school-16/video-1.webp", "duration": 10, "w": 406, "h": 720},
        {"type": "photo", "src": "school-16/photo-2.webp", "w": 787, "h": 1400},
        {"type": "video", "src": "school-16/video-2.mp4", "poster": "school-16/video-2.webp", "duration": 61, "w": 402, "h": 720}
      ]
    },
    {
      "school": 17,
      "name": "Rwamagana Lutheran School",
      "place": "Rwamagana District",
      "media": [
        {"type": "video", "src": "school-17/video-1.mp4", "poster": "school-17/video-1.webp", "duration": 10, "w": 406, "h": 720},
        {"type": "video", "src": "school-17/video-2.mp4", "poster": "school-17/video-2.webp", "duration": 34, "w": 406, "h": 720},
        {"type": "video", "src": "school-17/video-3.mp4", "poster": "school-17/video-3.webp", "duration": 2, "w": 406, "h": 720},
        {"type": "video", "src": "school-17/video-4.mp4", "poster": "school-17/video-4.webp", "duration": 2, "w": 406, "h": 720},
        {"type": "video", "src": "school-17/video-5.mp4", "poster": "school-17/video-5.webp", "duration": 10, "w": 406, "h": 720}
      ]
    },
    {
      "school": 18,
      "name": "Akagera International School",
      "place": "Kirehe District",
      "media": [
        {"type": "photo", "src": "school-18/photo-1.webp", "w": 787, "h": 1400},
        {"type": "video", "src": "school-18/video-1.mp4", "poster": "school-18/video-1.webp", "duration": 3, "w": 406, "h": 720},
        {"type": "video", "src": "school-18/video-2.mp4", "poster": "school-18/video-2.webp", "duration": 27, "w": 406, "h": 720},
        {"type": "video", "src": "school-18/video-3.mp4", "poster": "school-18/video-3.webp", "duration": 3, "w": 406, "h": 720}
      ]
    },
    {
      "school": 19,
      "name": "Kirehe TVET School",
      "place": "Kirehe District",
      "media": [
        {"type": "photo", "src": "school-19/photo-1.webp", "w": 608, "h": 1080},
        {"type": "video", "src": "school-19/video-1.mp4", "poster": "school-19/video-1.webp", "duration": 8, "w": 406, "h": 720}
      ]
    },
    {
      "school": 20,
      "name": "Karenge Adventist Secondary School",
      "place": "Rwamagana District",
      "media": [
        {"type": "photo", "src": "school-20/photo-1.webp", "w": 787, "h": 1400},
        {"type": "photo", "src": "school-20/photo-2.webp", "w": 787, "h": 1400}
      ]
    },
    {
      "school": 21,
      "name": "Groupe Scolaire Officiel de Butare (GSOB / Indatwa n'Inkesha)",
      "place": "Huye District",
      "media": [
        {"type": "photo", "src": "school-21/photo-1.webp", "w": 787, "h": 1400},
        {"type": "photo", "src": "school-21/photo-2.webp", "w": 787, "h": 1400}
      ]
    },
    {
      "school": 22,
      "name": "École des Sciences Byimana",
      "place": "Ruhango District",
      "media": [
        {"type": "photo", "src": "school-22/photo-1.webp", "w": 608, "h": 1080},
        {"type": "video", "src": "school-22/video-1.mp4", "poster": "school-22/video-1.webp", "duration": 56, "w": 402, "h": 720},
        {"type": "photo", "src": "school-22/photo-2.webp", "w": 608, "h": 1080},
        {"type": "video", "src": "school-22/video-2.mp4", "poster": "school-22/video-2.webp", "duration": 5, "w": 402, "h": 720}
      ]
    },
    {
      "school": 23,
      "name": "École des Sciences Saint Louis de Montfort Nyanza",
      "place": "Nyanza District",
      "media": [
        {"type": "video", "src": "school-23/video-1.mp4", "poster": "school-23/video-1.webp", "duration": 8, "w": 406, "h": 720},
        {"type": "video", "src": "school-23/video-2.mp4", "poster": "school-23/video-2.webp", "duration": 55, "w": 402, "h": 720},
        {"type": "video", "src": "school-23/video-3.mp4", "poster": "school-23/video-3.webp", "duration": 8, "w": 406, "h": 720}
      ]
    },
    {
      "school": 24,
      "name": "École Notre Dame De La Providence Karubanda (ENDPK)",
      "place": "Huye District",
      "media": [
        {"type": "video", "src": "school-24/video-1.mp4", "poster": "school-24/video-1.webp", "duration": 9, "w": 406, "h": 720},
        {"type": "video", "src": "school-24/video-2.mp4", "poster": "school-24/video-2.webp", "duration": 11, "w": 406, "h": 720},
        {"type": "video", "src": "school-24/video-3.mp4", "poster": "school-24/video-3.webp", "duration": 8, "w": 406, "h": 720},
        {"type": "video", "src": "school-24/video-4.mp4", "poster": "school-24/video-4.webp", "duration": 72, "w": 406, "h": 720}
      ]
    }
  ],

  experiments: [
    {
      "title": "Pendulum Timing: Exploring Simple Harmonic Motion",
      "text": "How does the length of a pendulum affect the time required for each swing? This experiment compares different string lengths and introduces simple harmonic motion, period, controlled measurement, gravity, and the physics behind a pendulum’s movement.",
      "views": 3,
      "length": "22:53",
      "featured": false,
      "image": "/assets/img/lab/welcome.webp",
      "video": "https://drive.google.com/file/d/15LJQXmjjLZYeUKEDCs_BGhgg6X-sdDyK/view",
      "slug": "pendulum-timing",
      "students": 1
    },
    {
      "title": "The Balloon Rocket Car: Newton’s Third Law in Motion",
      "text": "Can adding more air make a balloon-powered car travel farther? Build and test a simple rocket car while learning about action and reaction forces, air pressure, thrust, momentum, and Newton’s Third Law of Motion.",
      "views": 1,
      "length": "25:52",
      "featured": true,
      "image": "/assets/img/lab/welcome.webp",
      "video": "https://drive.google.com/file/d/1wfBEhg5PGMWzEN3alfOlRHB9N3cmrl_z/view",
      "slug": "balloon-rocket-car",
      "students": 1
    },
    {
      "title": "The Marble Ramp Race: How Steepness Affects Speed",
      "text": "How does a ramp’s angle change the speed of a rolling marble? This experiment uses ramps of different heights to explore gravity, friction, acceleration, and the component of gravitational force acting along an inclined surface.",
      "views": 1,
      "length": "13:55",
      "featured": false,
      "image": "/assets/img/lab/welcome.webp",
      "video": "https://drive.google.com/file/d/1uKxFVVcU1ogO3A96FMUoQhGfpVS3okOR/view",
      "slug": "marble-ramp-race",
      "students": 1
    },
    {
      "title": "The Pepper and Soap Experiment: Breaking Surface Tension",
      "text": "Watch pepper race toward the edge of a dish when soap touches the water. This experiment explains how soap lowers surface tension at the center, causing the surrounding water—and the pepper floating on it—to move outward.",
      "views": 0,
      "length": "8:44",
      "featured": false,
      "image": "/assets/img/lab/pepper-soap.webp",
      "video": "https://drive.google.com/file/d/15eVsD0jrhIebEkZh0p1w9wkXu8tk2FHn/view",
      "slug": "pepper-and-soap-experiment",
      "students": 0
    },
    {
      "title": "The Floating Ping-Pong Ball: Bernoulli’s Principle",
      "text": "Discover how a stream of air from a hair dryer can suspend a ping-pong ball—even when the dryer is tilted. This experiment uses balanced forces, air velocity, and pressure differences to explain Bernoulli’s principle in action.",
      "views": 0,
      "length": "10:44",
      "featured": true,
      "image": "/assets/img/lab/ping-pong.webp",
      "video": "https://drive.google.com/file/d/1jwJ_4y7yEcDtY9Ic8yZWZVgjrLdiGx26/view",
      "slug": "floating-ping-pong-ball",
      "students": 0
    },
    {
      "title": "Salt, Ice, and String: An Experiment with Friction",
      "text": "Can a piece of string lift an ice cube after salt is added? This investigation examines how salt changes the ice’s surface and increases friction, while also showing how an unsuccessful trial can reveal the effects of mass and experimental conditions.",
      "views": 0,
      "length": "7:32",
      "featured": false,
      "image": "/assets/img/lab/salt-ice.webp",
      "video": "https://drive.google.com/file/d/18qxBHHSn83961VNDDQHkL08gvtLFIHIN/view",
      "slug": "salt-ice-and-string",
      "students": 0
    },
    {
      "title": "The Water Bell Experiment: How Flow Creates Shape",
      "text": "What happens when running water strikes the curved surface of a spoon? By comparing weak, medium, and strong water flows, this experiment shows how momentum, gravity, surface tension, and flow rate create a bell-shaped sheet of water.",
      "views": 0,
      "length": "10:41",
      "featured": false,
      "image": "/assets/img/lab/water-bell.webp",
      "video": "https://drive.google.com/file/d/1oDLcfG0THg_KapBe9pVDvUCeizPHuE5Z/view",
      "slug": "water-bell-experiment",
      "students": 0
    },
    {
      "title": "Finding the Center of Mass: The Science of Balance",
      "text": "The geometric center of an object is not always its balancing point. Using a pencil and a bent object, this experiment explains how mass distribution and torque determine an object’s true center of mass.",
      "views": 0,
      "length": "6:58",
      "featured": false,
      "image": "/assets/img/lab/center-of-mass.webp",
      "video": "https://drive.google.com/file/d/17w-gY2C5O21_CtbcyA3Ck5FE-7vepUOI/view",
      "slug": "finding-the-center-of-mass",
      "students": 0
    },
    {
      "title": "The Coin Drop Challenge: Newton’s First Law in Action",
      "text": "Why does a coin fall straight into a glass when the card beneath it is quickly flicked away? This experiment introduces inertia and explores how mass, friction, gravity, and horizontal force affect the motion of stacked coins.",
      "views": 0,
      "length": "7:24",
      "featured": false,
      "image": "/assets/img/lab/coin-drop.webp",
      "video": "https://drive.google.com/file/d/13t0a-dZBu3XMBbPMMAEgjE8eUetC2BcM/view",
      "slug": "coin-drop-challenge",
      "students": 0
    },
    {
      "title": "The Waterproof Handkerchief: Exploring Surface Tension",
      "text": "Can a piece of cloth stop water from falling out of an upside-down cup? This experiment demonstrates how surface tension, cohesion, and adhesion create thousands of tiny water bridges across a wet handkerchief, forming a surprisingly strong liquid seal.",
      "views": 1,
      "length": "7:37",
      "featured": false,
      "image": "/assets/img/lab/handkerchief.webp",
      "video": "https://drive.google.com/file/d/1xMTcHneyi8vu_YfOz93C9cZPRLSZz4JD/view",
      "slug": "waterproof-handkerchief",
      "students": 0
    }
  ],

  /* Hidden GEMS podcast episodes, in order (1, 2, 3 …).
     slug:     short web address name → hidden_gems/watch.html#podcast-<slug>
     featured: true → also shown on the home page
     color:    top-border color — "pink", "orange" or "green"
     views:    play count · students: number of signed-in students who watched
     audio:    a Google Drive share link, a YouTube/Spotify link, or a file path */
  episodes: [
    {
      "slug": "sonya-lloyd",
      "title": "Full Throttle: Sonya Lloyd on Racing, Engineering, and Making It Happen",
      "text": "By day, Sonya Lloyd engineers industrial automation systems at Siemens; by passion, she races motorcycles in MotoAmerica's Twins Cup and represented the USA at the FIM Women's Circuit Racing World Championship. Starting racing at 17 — considered \"late\" — she was first denied entry, then turned the rejection into a MotoGP internship. She explains why a race bike carries 300+ sensors, treats AI as \"a thought partner, not a thought leader,\" and lives by her own rule: \"You are unstoppable if you simply decide to not stop.\"",
      "views": 2,
      "students": 1,
      "color": "pink",
      "audio": "https://drive.google.com/file/d/13BZnAz2vYevU08uGLwWYdcBVFJYo9L1j/view",
      "guest": "Sonya Lloyd",
      "category": "Engineering",
      "role": "Motorcycle racer",
      "affiliation": ""
    },
    {
      "slug": "giulia-ferrini",
      "featured": true,
      "title": "\"If You Don't See Yourself in Science, Science Needs You\" — Professor Giulia Ferrini",
      "text": "From Genoa to Grenoble, Paris, Germany and finally Sweden, Professor Giulia Ferrini chased quantum physics across half of Europe — and now helps build Sweden's first superconducting quantum computer. She talks about quantum error correction, why quantum computers will force the world to rethink encryption, and the postdoc years when temporary contracts nearly broke her confidence. Her mantra for young scientists: \"If you don't see anyone in science that looks like you, then science needs you.\"",
      "views": 0,
      "students": 0,
      "color": "orange",
      "audio": "https://drive.google.com/file/d/15tTYngsnWktpxCvC-gT6357YbM-r9fbT/view",
      "guest": "Giulia Ferrini",
      "category": "Physics",
      "role": "Quantum physicist",
      "affiliation": "Chalmers University of Technology"
    },
    {
      "slug": "christiane-koch",
      "title": "Trust Your Questions: Christiane Koch on Quantum Physics and Self-Doubt",
      "text": "Professor Christiane Koch never planned to be a physicist — a one-year orientation program between high school and university convinced her that mathematics could describe reality. Today she studies chiral, \"handed\" molecules and how laser fields can reveal their hidden asymmetry. She speaks candidly about self-doubt at the start of her PhD and as a group leader, and reminds students that the goal of learning is not to get the right answer — it's to learn how to get to it.",
      "views": 0,
      "students": 0,
      "color": "green",
      "audio": "https://drive.google.com/file/d/12DeJ8UBrjI09nsd48o9GEBMgLARzzdLS/view",
      "guest": "Christiane Koch",
      "category": "Physics",
      "role": "Professor of theoretical physics",
      "affiliation": ""
    },
    {
      "slug": "eden-zhu",
      "featured": true,
      "title": "From Physics to the Brain: Eden Zhu on Building an Interdisciplinary Career",
      "text": "Eden Zhu walked from physics degrees at Nanjing University and Cambridge into a neuroscience PhD at Emory University — and never lost her love of math along the way. She opens up about trying and rejecting experimental work, finding her home in computational research on human memory, and using AI as a partner rather than a replacement. Her message to girls entering male-dominated fields: find your community, speak up, and trust that setbacks are simply part of the research path.",
      "views": 1,
      "students": 1,
      "color": "pink",
      "audio": "https://drive.google.com/file/d/1GWVYjtuqM89aAw-gsiXWvogpS4FPSUUv/view",
      "guest": "Eden Zhu",
      "category": "Neuroscience",
      "role": "Neuroscience",
      "affiliation": "Emory University"
    }
  ],

  /* Newsletter "field briefings", newest first (the order they appear on the page).
     Each one also gets its own page: newsletter/briefing.html#<slug>
     slug:   the short web address name — letters, numbers and dashes only
     color:  left panel color — "pink", "orange" or "green"
     body:   the full write-up, one string per paragraph
     images: photos shown under the write-up, in order (files in assets/img/newsletter/) */
  briefings: [
    {
      "slug": "kenya-service-trip",
      "date": "2025.05",
      "category": "SERVICE TRIP",
      "place": "KENYA",
      "color": "pink",
      "title": "Kenya Service Trip -- Education Outreach Campaign",
      "text": "We launched our GEMS textbook distribution in the Ilangrooj Primary school of Kajiado county, Nairobi. The school consists of approximately 300 students, from pre K to grade 9.",
      "body": [
        "When I first announced the GEMS textbook project to the school community, they were more than thrilled. They were especially touched that high school students from 10000 kilometers away would care about the education of “strangers” with no ties to them. As I told them we care about giving back what we were given to us, many students said that they aspired to do so too in the future. In that conversation I felt, while small, the influence of our project. Our long term goal beyond improving education is not just “helping” one community, but contributing to a more sustainable cycle of “paying it forward”.",
        "Over the past few years visiting Kenya, I came to really see the disparity among regions in access to knowledge. In Ilangrooj Primary, internet access is available in their small library, with two bulky beige boxes which I believe are PCs from the 2000s. These are shared by the entire school, which makes research extremely difficult. Because of that, many faculty members would tell me how learning beyond the textbook and delving into more advanced levels of knowledge was difficult for their students. In that sense, they told me that these textbooks with specialized content will be extremely helpful in developing the interests of students. This I felt too when we sat down with a group of 9th graders to read through the textbook together. They had millions of questions and were extremely fascinated by some new facts they found. Many were eager to find out more about these topics, and I realized how our textbooks and efforts may contribute to opening new doors and planting seeds that could shape their future. Furthermore, it was very nice seeing them show their inner learner as a response to our project.",
        "There were some realistic limitations, however. As English isn’t their first language and internet access remains limited, I could see that some advanced vocabulary in the textbooks could cause confusion. I believe that a crucial step for the future would be to try and consider those challenges and language barriers, which will definitely be an issue in the expansion of this project.",
        "Furthermore, a lot of the students, even those in 9th grade, were unfamiliar with knowledge required to understand the content in our textbooks. For instance, when I was reading through the textbook with the students, we ended up completely skipping the chapter on quantum chemistry. This reminded me that increasing access to educational resources also requires knowing the needs of the target audience. We did actually attempt to address this baseline need, through gathering and donating commercial textbooks on the fundamentals of various STEM subjects. While the usefulness of the combined use of multiple textbooks may not be obvious, with time students will be able to develop a better understanding of the more advanced/specialized contents in our GEMS textbooks.",
        "This experience was a great opportunity for me to learn more about the realistic impact of our project. Evaluating what works and what needs more work has helped us modify and further improve said project since then."
      ],
      "images": [
        "/assets/img/newsletter/kenya-service-trip-1.webp",
        "/assets/img/newsletter/kenya-service-trip-2.webp",
        "/assets/img/newsletter/kenya-service-trip-3.webp",
        "/assets/img/newsletter/kenya-service-trip-4.webp"
      ],
      "button": "VIEW THE EXPERIENCE"
    },
    {
      "slug": "tutoring-workshop",
      "date": "2025.04",
      "category": "TUTORING",
      "place": "OFFLINE",
      "color": "green",
      "title": "International Tutoring Program — Workshop",
      "text": "A continuation of our multi-day STEM workshops with the multinational children at Baraka Children’s Center, centered on teaching both the beauty of STEM and equity.",
      "body": [
        "We’ve hosted yet another session at Baraka Little Library to help the students learn not only the importance of STEM but also the beauty and power that lies within STEM applications to create the world around us. Per usual, our sessions had multiple components; each one designed to help the girls in the center grow as scientists of the future. First, we explored broad fields like mechanical engineering and chemistry before diving into deeper topics like alchemy. This helped our students avoid tunnel vision—a trap that can make highly specific and often complex topics seem daunting or boring. Second, we utilized an educational plan that focuses on the experimental aspects of each specific topic. For instance, to demonstrate the widespread applications of mechanical engineering, we provided the students with varying levels of car-building experience and theoretical lectures to help them advance their own cars with physical techniques that optimize the tension of the rubber bands or minimize drag force with a pointed head. Moreover, to ensure that the students can learn to independently conduct the whole scientific process, we allowed the students to devise their own hypothesis, materials list, and procedure before conducting the actual experimentation process. Finally, we connected the whole process to at least one related female professor, researcher, or scientist to provide the girls with a role model, a source of inspiration to always look up to with hope and passion.",
        "We hope to continue this process and our workshops as much as possible with diverse children's centers. If you would like to join us in this project to help girls worldwide or would like our services in your center, please contact info@gems-stem.com."
      ],
      "images": [
        "/assets/img/newsletter/tutoring-workshop-1.webp",
        "/assets/img/newsletter/tutoring-workshop-2.webp",
        "/assets/img/newsletter/tutoring-workshop-3.webp"
      ],
      "button": "READ THE BRIEFING"
    },
    {
      "slug": "tutoring-workshop-launch",
      "date": "2024.03",
      "category": "TUTORING",
      "place": "OFFLINE",
      "color": "green",
      "title": "International Tutoring Program — Workshop Launch",
      "text": "Our first offline tutoring session and multi-day STEM workshop with children at Baraka Children’s Center, launching a long-term partnership to ensure all children receive the necessary quality of STEM inspiration.",
      "body": [
        "Since our organization values not only online tutoring but also in-person activities, we held our first face-to-face workshop from March 25 to March 27. Baraka Children’s Center is a place where children can stay after school while their parents, who often work late hours, are still at work. Typically, the children use this space to ask about homework or to play. However, we felt it was unfortunate that the children were not receiving focused guidance nor had the chance to fully explore their own interests. To make better use of this time, our organization hosted a three-day workshop focused on STEM for young girls. On the first day, students learned about chemiluminescence (chemical luminescence) by creating glowing liquids and exploring why water can emit light. On the second day, they participated in a physics-based egg drop experiment, discovering firsthand how to minimize the force of gravity acting on objects. On the final day, we explored one of the children’s favorite toys—slime—through a fun inquiry into whether slime is a liquid or a solid. Our members also expressed great satisfaction, as the in-person activities not only provided valuable insights to the students but also created moments of joy and inspiration."
      ],
      "images": [
        "/assets/img/newsletter/tutoring-workshop-launch-1.webp",
        "/assets/img/newsletter/tutoring-workshop-launch-2.webp"
      ],
      "button": "READ THE BRIEFING"
    },
    {
      "slug": "hidden-gems-recording",
      "date": "2025.01",
      "category": "PODCAST",
      "place": "STUDIO",
      "color": "orange",
      "title": "HIDDEN GEMS — RECORDING BEGINS",
      "text": "Production began on the inaugural season of Hidden GEMS, with our first guests confirmed across academia and industry.",
      "body": [],
      "images": [
        "/assets/img/newsletter/hidden-gems-recording-1.webp",
        "/assets/img/newsletter/hidden-gems-recording-2.webp"
      ],
      "button": "READ THE BRIEFING"
    }
  ],

  /* Collaborators — shown on the home page strip and the Collaborators page, in this order.
     id:        short web anchor → collaborators/#<id>
     short:     the text in the badge (SWE, TTTA …)
     website:   leave "" to hide the "Visit website" link
     pending:   true shows a "Statement pending" tag instead of an empty description */
  collaborators: [
    {
      "id": "swe",
      "short": "SWE",
      "name": "Society of Women Engineers",
      "meta": "Global professional organization · Global (HQ: United States)",
      "website": "https://swe.org",
      "relationship": "Partner through SWE's global affiliate network and SWENext",
      "about": "The Society of Women Engineers is the world's largest advocate for women in engineering and technology, with roughly 45,000 members across more than 90 countries. GEMS works with SWE through its global affiliate network and SWENext, SWE's program for students aged 5 to 18, connecting our K-12 reach in Korea and Singapore with SWE's professional network of practicing engineers.",
      "together": [
        "GEMS chapters aligned with SWENext programming for students aged 5–18",
        "Access to SWE's global affiliate network for mentorship and guest speakers",
        "Shared outreach in Korea and Singapore, where SWE's affiliate presence is growing"
      ],
      "pending": false
    },
    {
      "id": "ttta",
      "short": "TTTA",
      "name": "The Tiger Team Academy",
      "meta": "Coding bootcamp and digital innovation incubator · Nakhon Ratchasima (Korat), Thailand",
      "website": "",
      "relationship": "Collaboration partner for STEM education and women-in-tech programming in Thailand",
      "about": "The Tiger Team Academy is a coding bootcamp and digital innovation incubator in Nakhon Ratchasima, Thailand, founded in 2018, working at the intersection of software education, local industry, and Thailand's emerging quantum technology ecosystem. GEMS and TTTA are collaborating to bring girls-in-STEM programming to Korat, pairing GEMS curriculum and mentorship with TTTA's engineering team and physical presence in Thailand.",
      "together": [
        "Joint programming for secondary-school girls in Nakhon Ratchasima",
        "Connection to Thailand's quantum research community through TTTA's academic advisors",
        "A model for GEMS expansion beyond Korea and Singapore"
      ],
      "pending": false
    },
    {
      "id": "oecd",
      "short": "OECD",
      "name": "OPAL Reviewer at the OECD",
      "meta": "Individual · Official at the Organisation for Economic Co-operation and Development",
      "website": "https://www.oecd.org/",
      "relationship": "Reviewer of the OPAL textbook",
      "about": "",
      "together": [
        "Official comments on the OPAL textbook"
      ],
      "pending": true
    }
  ],

  /* ---------- Initiative pages ----------
     upcomingGuests: Hidden GEMS guests whose episode isn't out yet ("Coming soon" cards)
     labCategories / library: the GEMS Lab experiment curriculum.
       video: the slug of a released experiment video above → card shows "Watch"; "" → "Filming"
     opalAmazonUrl: paste the Amazon link when OPAL is listed; "" shows "Link coming soon" */
  upcomingGuests: [
    {
      "guest": "Danna Freedman",
      "category": "Chemistry",
      "role": "Professor of Chemistry",
      "affiliation": "MIT"
    }
  ],
  labCategories: [
    {
      "id": "motion",
      "label": "Motion & Forces",
      "color": "pink"
    },
    {
      "id": "energy",
      "label": "Energy",
      "color": "orange"
    },
    {
      "id": "waves",
      "label": "Waves & Sound",
      "color": "green"
    },
    {
      "id": "light",
      "label": "Light & Optics",
      "color": "orange"
    },
    {
      "id": "electricity",
      "label": "Electricity & Magnetism",
      "color": "pink"
    },
    {
      "id": "fluids",
      "label": "Fluids & Pressure",
      "color": "green"
    }
  ],
  library: [
    {
      "num": 1,
      "title": "The Pepper and Soap Experiment",
      "concept": "Surface tension, soap molecules, water movement",
      "category": "fluids",
      "phase": 1,
      "video": "pepper-and-soap-experiment"
    },
    {
      "num": 2,
      "title": "The Floating Ping-Pong Ball",
      "concept": "Bernoulli's principle, air velocity, balanced forces",
      "category": "fluids",
      "phase": 1,
      "video": "floating-ping-pong-ball"
    },
    {
      "num": 3,
      "title": "Salt, Ice, and String",
      "concept": "Friction, freezing point, melting",
      "category": "energy",
      "phase": 1,
      "video": "salt-ice-and-string"
    },
    {
      "num": 4,
      "title": "The Water Bell Experiment",
      "concept": "Fluid flow, surface tension, water sheets",
      "category": "fluids",
      "phase": 1,
      "video": "water-bell-experiment"
    },
    {
      "num": 5,
      "title": "Finding the Center of Mass",
      "concept": "Center of mass, balance, stability",
      "category": "motion",
      "phase": 1,
      "video": "finding-the-center-of-mass"
    },
    {
      "num": 6,
      "title": "The Coin Drop Challenge",
      "concept": "Newton's first law, inertia",
      "category": "motion",
      "phase": 1,
      "video": "coin-drop-challenge"
    },
    {
      "num": 7,
      "title": "The Waterproof Handkerchief",
      "concept": "Surface tension, air pressure",
      "category": "fluids",
      "phase": 1,
      "video": "waterproof-handkerchief"
    },
    {
      "num": 8,
      "title": "Marble Ramp Race",
      "concept": "Inclined planes, friction, acceleration",
      "category": "motion",
      "phase": 1,
      "video": "marble-ramp-race"
    },
    {
      "num": 9,
      "title": "Balloon Rocket Car",
      "concept": "Newton's third law",
      "category": "motion",
      "phase": 1,
      "video": "balloon-rocket-car"
    },
    {
      "num": 10,
      "title": "Egg Drop Challenge",
      "concept": "Momentum, impulse, cushioning force",
      "category": "motion",
      "phase": 3,
      "video": ""
    },
    {
      "num": 11,
      "title": "Paper Helicopter Drop",
      "concept": "Air resistance, terminal velocity",
      "category": "motion",
      "phase": 2,
      "video": ""
    },
    {
      "num": 12,
      "title": "Pendulum Timing",
      "concept": "Period depends on length, not mass",
      "category": "motion",
      "phase": 2,
      "video": "pendulum-timing"
    },
    {
      "num": 13,
      "title": "Coin Flick Collision",
      "concept": "Conservation of momentum",
      "category": "motion",
      "phase": 2,
      "video": ""
    },
    {
      "num": 14,
      "title": "Bouncing Ball Heights",
      "concept": "Elastic vs inelastic collisions, energy loss",
      "category": "energy",
      "phase": 1,
      "video": ""
    },
    {
      "num": 15,
      "title": "Rube Goldberg Marble Run",
      "concept": "Chains of energy transformation",
      "category": "energy",
      "phase": 3,
      "video": ""
    },
    {
      "num": 16,
      "title": "Rubber-Band Catapult",
      "concept": "Elastic potential to kinetic energy",
      "category": "energy",
      "phase": 2,
      "video": ""
    },
    {
      "num": 17,
      "title": "Foam-Pipe Roller Coaster",
      "concept": "Conservation of energy, loop height rules",
      "category": "energy",
      "phase": 2,
      "video": ""
    },
    {
      "num": 18,
      "title": "Cup-and-String Telephone",
      "concept": "Sound as vibration through a medium",
      "category": "waves",
      "phase": 1,
      "video": ""
    },
    {
      "num": 19,
      "title": "Rubber Band Guitar",
      "concept": "Frequency, pitch, tension",
      "category": "waves",
      "phase": 1,
      "video": ""
    },
    {
      "num": 20,
      "title": "Water Glass Xylophone",
      "concept": "Resonance, pitch vs water volume",
      "category": "waves",
      "phase": 2,
      "video": ""
    },
    {
      "num": 21,
      "title": "Slinky Wave Demo",
      "concept": "Transverse vs longitudinal waves",
      "category": "waves",
      "phase": 1,
      "video": ""
    },
    {
      "num": 22,
      "title": "Standing Waves in a Rope",
      "concept": "Nodes, antinodes, standing wave frequency",
      "category": "waves",
      "phase": 2,
      "video": ""
    },
    {
      "num": 23,
      "title": "Water-Drop Lens",
      "concept": "Refraction, magnification",
      "category": "light",
      "phase": 1,
      "video": ""
    },
    {
      "num": 24,
      "title": "CD Rainbow",
      "concept": "Diffraction, dispersion",
      "category": "light",
      "phase": 1,
      "video": ""
    },
    {
      "num": 25,
      "title": "Pinhole Camera",
      "concept": "Light travels in straight lines, image inversion",
      "category": "light",
      "phase": 3,
      "video": ""
    },
    {
      "num": 26,
      "title": "Shadow Size Experiment",
      "concept": "Light source distance vs shadow size",
      "category": "light",
      "phase": 2,
      "video": ""
    },
    {
      "num": 27,
      "title": "Bending Straw in Water",
      "concept": "Refraction at a boundary",
      "category": "light",
      "phase": 1,
      "video": ""
    },
    {
      "num": 28,
      "title": "Static Balloon Bending Water",
      "concept": "Static charge, electric force",
      "category": "electricity",
      "phase": 1,
      "video": ""
    },
    {
      "num": 29,
      "title": "Lemon Battery",
      "concept": "Chemical to electrical energy",
      "category": "electricity",
      "phase": 2,
      "video": ""
    },
    {
      "num": 30,
      "title": "Compass and Wire (Oersted's Experiment)",
      "concept": "Current creates a magnetic field",
      "category": "electricity",
      "phase": 2,
      "video": ""
    },
    {
      "num": 31,
      "title": "Homemade Electromagnet",
      "concept": "Coil turns vs magnetic strength",
      "category": "electricity",
      "phase": 3,
      "video": ""
    },
    {
      "num": 32,
      "title": "Static Salt and Pepper Sorting",
      "concept": "Electrostatic attraction",
      "category": "electricity",
      "phase": 1,
      "video": ""
    },
    {
      "num": 33,
      "title": "Cartesian Diver",
      "concept": "Buoyancy, pressure, gas compression",
      "category": "fluids",
      "phase": 2,
      "video": ""
    },
    {
      "num": 34,
      "title": "Egg in a Bottle",
      "concept": "Air pressure, thermal expansion of gas",
      "category": "fluids",
      "phase": 3,
      "video": ""
    },
    {
      "num": 35,
      "title": "Density Tower",
      "concept": "Density and buoyancy",
      "category": "fluids",
      "phase": 1,
      "video": ""
    },
    {
      "num": 36,
      "title": "Balloon in Hot vs Cold Water",
      "concept": "Gas laws, pressure and temperature",
      "category": "fluids",
      "phase": 2,
      "video": ""
    },
    {
      "num": 37,
      "title": "Unbreakable Bag",
      "concept": "Polymer chains, pressure sealing",
      "category": "fluids",
      "phase": 3,
      "video": ""
    }
  ],
  opalAmazonUrl: ""
};
