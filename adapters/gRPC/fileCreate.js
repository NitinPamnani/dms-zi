import client from './gRPCClient.js';

client.createFile({parentDirId:"17224fac-fcb0-4c49-a472-6e7a232f99bb",
content:"Chak", name:"hellpji", token:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMTlhZWNkNi1lZWM0LTQyNWMtYTdlZC1kZWE5NzlhMmZkMzciLCJ1c2VybmFtZSI6Im5pdGluMm4zMyIsImVtYWlsIjoibml0aW5wYW1uYW5pMDAyQGdtYWlsLmNvbSIsInJvb3REaXIiOiIiLCJpYXQiOjE2OTQ5NDE3NjYsImV4cCI6MTY5NjIzNzc2NiwiYXVkIjoiZG1zIHVzZXJzIiwiaXNzIjoiZG1zLXppIiwic3ViIjoiYXV0aCB0b2tlbiBmb3IgZG1zLXppIn0.F1sXRCT1jm4q9YgsHnZKgC7_WjESoubzqcL56KQ6Ty0R9-IoSweURyT2-uV6ZdIqKbmj-VRvegYHmioh6t5LUp2JtCO_N3abhcNnwXYxm3nRshALwLjU9pla_Ov5pCljoS2w6ooOLBqGv6j14mN4pQsiXDoxoq5eUdK_e9XcWT8nDZk2B5ABbjnqkGJ2-tvA2W3mTgJAcHvtVBS-uc9AeXOZADCAP8E0xMUkseF7wpExU-QLkN3PLaFjPmJxZhdPS9CFyv-edUOVrfeMHTs6NtqGCkLZlhuU23LuQ2I5UewJJp_3EmZDdf_2uCorF3ARw0fSMVoQZmLxWJFZ2QeQUQ"},(error, token) => {
    console.log(error, token)
});


/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMTlhZWNkNi1lZWM0LTQyNWMtYTdlZC1kZWE5NzlhMmZkMzciLCJ1c2VybmFtZSI6Im5pdGluMm4zMyIsImVtYWlsIjoibml0aW5wYW1uYW5pMDAyQGdtYWlsLmNvbSIsInJvb3REaXIiOiIiLCJpYXQiOjE2OTQ5NDE3NjYsImV4cCI6MTY5NjIzNzc2NiwiYXVkIjoiZG1zIHVzZXJzIiwiaXNzIjoiZG1zLXppIiwic3ViIjoiYXV0aCB0b2tlbiBmb3IgZG1zLXppIn0.F1sXRCT1jm4q9YgsHnZKgC7_WjESoubzqcL56KQ6Ty0R9-IoSweURyT2-uV6ZdIqKbmj-VRvegYHmioh6t5LUp2JtCO_N3abhcNnwXYxm3nRshALwLjU9pla_Ov5pCljoS2w6ooOLBqGv6j14mN4pQsiXDoxoq5eUdK_e9XcWT8nDZk2B5ABbjnqkGJ2-tvA2W3mTgJAcHvtVBS-uc9AeXOZADCAP8E0xMUkseF7wpExU-QLkN3PLaFjPmJxZhdPS9CFyv-edUOVrfeMHTs6NtqGCkLZlhuU23LuQ2I5UewJJp_3EmZDdf_2uCorF3ARw0fSMVoQZmLxWJFZ2QeQUQ
 */