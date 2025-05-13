 const teamMembers = [
      {
        name: "Himanshu Yadav",
        role: "Frontend Developer",
        bio: "Enthusiastic frontend developer with a passion for creating interactive web applications.Creative thinker with a knack for designing intuitive interfaces",
       image: "https://i.pravatar.cc/150?img=11",
        linkedin: "#",
        github: "#"
      },
      {
        name: "Raj Kumar",
        role: "fullstack Developer",
        bio: "Fullstack developer with a focus on MERN stack. Loves building scalable applications and exploring new technologies.",
        image: "https://i.pravatar.cc/150?img=12",
        linkedin: "#",
        github: "#"
      },
      {
        name: "Vishal Mohanta",
        role: "Graphic Designer and Developer",
        bio: "Creative graphic designer and developer with a passion for crafting visually stunning and user-friendly interfaces.",
        image: "https://i.pravatar.cc/150?img=13",
        linkedin: "#",
        github: "#"
      },
      
     
    ];

    const container = document.getElementById("team-grid");

    teamMembers.forEach(member => {
      const card = document.createElement("div");
      card.className = "team-member";
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p class="role">${member.role}</p>
        <p class="bio">${member.bio}</p>
        <div class="social-icons">
          <a href="${member.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
          <a href="${member.github}" target="_blank"><i class="fab fa-github"></i></a>
        </div>
      `;
      container.appendChild(card);
    });