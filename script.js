document.addEventListener("DOMContentLoaded", function () {
    const roles = [
        "หมาป่า",
        "ชาวบ้าน",
        "ยาจก",
        "หมอ",
        "มือปืน",
        "หยั่งรู้",
        "คนบ้า",
        "ระเบิด",
        "ลูกหมาป่า",
    ];

    const roleElement = document.getElementById("role");
    const roleTable = document.getElementById("roleTable");
    const roleList = document.getElementById("roleList");
    const randomButton = document.getElementById("randomButton");
    const clearButton = document.getElementById("clearButton");
    const toggleTableButton = document.getElementById("toggleTableButton");
    const resetButton = document.getElementById("resetButton");

    let selectedRoles = [];
    let roleCount = 0;
    let tableVisible = true;

    // ฟังก์ชันเพื่อเปิด/ปิดการเห็นตาราง
    function toggleTable() {
        if (tableVisible) {
            roleTable.style.display = "none";
            toggleTableButton.textContent = "เปิดตาราง";
        } else {
            roleTable.style.display = "table";
            toggleTableButton.textContent = "ปิดตาราง";
        }
        tableVisible = !tableVisible;
    }

    // เรียกใช้ฟังก์ชันเมื่อกดปุ่ม "เปิด/ปิด ตาราง"
    toggleTableButton.addEventListener("click", toggleTable);

    // ฟังก์ชันสำหรับสุ่มบทบาท
    function randomRole() {
        if (selectedRoles.length === roles.length) {
            roleElement.textContent = "บทบาทหมดแล้วรีเกมส์ได้นะ";
            randomButton.disabled = true;
            resetButton.disabled = false;
            return;
        }

        let randomRole;

        do {
            randomRole = roles[Math.floor(Math.random() * roles.length)];
        } while (selectedRoles.includes(randomRole));

        selectedRoles.push(randomRole);
        roleElement.textContent = randomRole;

        // แสดงบทบาทในตารางอันดับ
        roleCount++;
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${roleCount}</td><td>${randomRole}</td>`;
        roleList.appendChild(newRow);

        clearButton.disabled = false;
    }

    // ฟังก์ชันสำหรับซ่อนบทบาทครั้งที่แล้ว
    function hideLastRole() {
        if (roleCount > 0) {
            roleElement.textContent = "";
            clearButton.disabled = true;
            randomButton.disabled = false;
        }
    }

    // ฟังก์ชันสำหรับรีเกมส์
    function resetGame() {
        selectedRoles = [];
        roleCount = 0;
        roleElement.textContent = "";
        randomButton.disabled = false;
        resetButton.disabled = true;
        clearButton.disabled = true;
        while (roleList.firstChild) {
            roleList.removeChild(roleList.firstChild);
        }
        toggleTableButton.disabled = false;
    }

    // เรียกใช้ฟังก์ชันสุ่มบทบาทเมื่อกดปุ่ม "สุ่มบทบาท"
    randomButton.addEventListener("click", randomRole);

    // เรียกใช้ฟังก์ชันซ่อนบทบาทเมื่อกดป่ม "ซ่อนบทบาท"
    clearButton.addEventListener("click", hideLastRole);

    // เรียกใช้ฟังก์ชันรีเกมส์เมื่อกดปุ่ม "รีเกมส์"
    resetButton.addEventListener("click", resetGame);
});
