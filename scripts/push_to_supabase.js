const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hrbyhgmhjswugkmeuzdt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYnloZ21oanN3dWdrbWV1emR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNDA3OTIsImV4cCI6MjEwMTkxNjc5Mn0.gcUHWJohYlCumrrWD5etwvZsgGvAW8_w5qM1V0dX3W8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ADMIN_EMAIL = 'cyberkiet24@gmail.com';
const ADMIN_PASS = 'CyberCrewWebSiteAdminPanel@24';

async function run() {
  console.log("=== Updating Rich Projects Data in Supabase ===");

  // 1. Authenticate Admin
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASS
  });
  if (authError) {
    console.error("Auth Failed:", authError.message);
    return;
  }

  // 2. Delete old project entries
  await supabase.from('cyber_projects').delete().neq('id', 0);

  // 3. Define Real Projects with Rich Capabilities & Research Team Data
  const realProjects = [
    {
      title: "Web Scanner",
      description: "WebScanner is an advanced cybersecurity tool designed to identify vulnerabilities in web applications. Leveraging cutting-edge scanning algorithms, it detects XSS, SQL injection, and header misconfigurations to empower developers with immediate remediation data.",
      category: "AUTOMATED SCANNER // WEB SEC",
      status: "Active",
      github_url: "https://github.com/gowthamsai117/Vulnerability-Web-Scanner",
      img_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348491517_Webscanner.png",
      images: [
        "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348491517_Webscanner.png"
      ],
      capabilities_heading: "CORE SCANNING CAPABILITIES",
      capabilities: [
        {
          title: "Vulnerability Scanning Engine",
          description: "Performs automated, real-time scans to detect web application vulnerabilities like XSS, SQLi, and security misconfigurations.",
          image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348491517_Webscanner.png"
        }
      ],
      team: [
        { name: "Gowtham", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348497854_Gowtham.jpg", linkedin: "https://www.linkedin.com/in/gowtham-satya-sai-m" },
        { name: "Pradeep", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348499337_Pradeep.jpg", linkedin: "https://www.linkedin.com/in/gopisetti-pradeep-5aa4a0250" },
        { name: "Sanjay", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348501914_Sanjay.jpg", linkedin: "https://www.linkedin.com/in/mudigondasanjay" },
        { name: "Jyothi", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348498687_Jyothi.jpg", linkedin: "https://www.linkedin.com/in/telegareddy-jyothirmai-686750286" },
        { name: "Thabitha", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348504515_Thabitha.jpg", linkedin: "https://www.linkedin.com/in/thabitha-gogulamanda-3a3960288" },
        { name: "Naga Lakshmi", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348500699_Sahithya.jpg", linkedin: "https://www.linkedin.com/in/siramalasiramala" }
      ]
    },
    {
      title: "Encrypto Web",
      description: "EncryptoWeb is a web application designed to offer simple and secure encryption and decryption tools for users. Powered by modern cryptographic standards, it ensures data privacy for sensitive text, passwords, and digital communications.",
      category: "CRYPTOGRAPHY SUITE // WEB SEC",
      status: "Active",
      github_url: "https://github.com/cybercrew/encryptoweb",
      img_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348480902_crypto1.jpg",
      images: [
        "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348480902_crypto1.jpg",
        "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348481271_crypto2.jpg"
      ],
      capabilities_heading: "CORE CRYPTOGRAPHIC CAPABILITIES",
      capabilities: [
        {
          title: "AES-256 Encryption & Decryption Engine",
          description: "Utilizes advanced AES-256 bit symmetric key encryption to secure plaintext matter into uncrackable ciphertext.",
          image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348481573_crypto3.jpg"
        }
      ],
      team: [
        { name: "Durga Srinivas", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348506081_vasu.jpg", linkedin: "https://www.linkedin.com/in/durga-srinivas" },
        { name: "Chakresh Ram", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348494011_chakresh.png", linkedin: "https://www.linkedin.com/in/chakresh-ram-kudupudi-85a6a0256/" }
      ]
    },
    {
      title: "Emoji Cipher",
      description: "Emoji Cipher is an innovative visual payload steganography and encryption suite. It converts confidential messages into emoji sequences to bypass traditional text-based intrusion detection filters while maintaining zero plaintext visibility.",
      category: "VISUAL STEGANOGRAPHY // DEFENSE",
      status: "Active",
      github_url: "https://github.com/cybercrew/emojicipher",
      img_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348486397_emojicipher1.png",
      images: [
        "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348486397_emojicipher1.png",
        "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348487516_emojicipher2.png"
      ],
      capabilities_heading: "EMOJI STEGANOGRAPHY FEATURES",
      capabilities: [
        {
          title: "Visual Emoji Cipher Mapping",
          description: "Encodes arbitrary payloads into benign emoji strings using customizable secret keys and derivation salt.",
          image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348487516_emojicipher2.png"
        }
      ],
      team: [
        { name: "Harsha", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348498244_Harsha.jpg", linkedin: "https://www.linkedin.com" },
        { name: "Arshith", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348491828_Arshith.jpg", linkedin: "https://www.linkedin.com" }
      ]
    },
    {
      title: "Secure Hospital Network",
      description: "A comprehensive medical network architecture designed using Cisco Packet Tracer to enforce strict HIPAA compliance, medical IoT device isolation, VLAN segmentation, and zero-trust perimeter defenses.",
      category: "INFRASTRUCTURE & HIPAA SEC",
      status: "Active",
      img_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348489367_hospital.jpg",
      images: [
        "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348489367_hospital.jpg"
      ],
      capabilities_heading: "NETWORK TOPOLOGY MODULES",
      capabilities: [
        {
          title: "Cisco VLAN & HIPAA Segmentation",
          description: "Segregates patient record databases, medical telemetry devices, and public Wi-Fi into isolated network zones.",
          image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348489367_hospital.jpg"
        }
      ],
      team: [
        { name: "Daniel", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348495451_Daniel.jpg", linkedin: "https://www.linkedin.com" },
        { name: "Gopi", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348497608_GOPI.jpeg", linkedin: "https://www.linkedin.com" }
      ]
    },
    {
      title: "DeepNetGuard",
      description: "DeepNetGuard is an advanced darkweb threat intelligence monitor. It scans Tor onion networks, paste sites, and dark web markets to detect leaked institutional credentials and compromised server endpoints.",
      category: "DARKWEB THREAT INTEL",
      status: "Active",
      github_url: "https://github.com/cybercrew/deepnetguard",
      img_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348483441_deepnet1.jpg",
      images: [
        "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348483441_deepnet1.jpg",
        "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348484676_deepnet2.jpg"
      ],
      capabilities_heading: "DARKNET RECON MODULES",
      capabilities: [
        {
          title: "Tor Onion Crawler Engine",
          description: "Monitors hidden services for unauthorized credential dumps and alerts SOC analysts in real-time.",
          image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348484676_deepnet2.jpg"
        }
      ],
      team: [
        { name: "Ajay", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348476393_ajay_anna.jpg", linkedin: "https://www.linkedin.com" },
        { name: "Dhanush", image: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348485821_dhanush.jpg", linkedin: "https://www.linkedin.com" }
      ]
    }
  ];

  const { data: insertedData, error: insertErr } = await supabase.from('cyber_projects').insert(realProjects).select();
  if (insertErr) {
    console.error("❌ Error inserting projects:", insertErr.message);
  } else {
    console.log(`✅ Successfully updated ${insertedData.length} rich projects in Supabase!`);
  }
}

run().catch(err => console.error("Script failed:", err));
