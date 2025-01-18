"use client";
import { FC, useState, FormEvent } from "react";
import Link from "next/link";
import { Linkedin, FileText, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NotificationType = "success" | "error" | null;

interface Notification {
  type: NotificationType;
  message: string;
}

interface FloatingCircleProps {
  delay: number;
  size: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const FloatingCircle: FC<FloatingCircleProps> = ({ delay, size, position }) => (
  <motion.div
    className={`absolute rounded-full bg-cyellow opacity-20 ${size}`}
    style={position}
    initial={{ y: 0 }}
    animate={{
      y: [-20, 20],
      x: [-10, 10],
    }}
    transition={{
      repeat: Infinity,
      repeatType: "reverse",
      duration: 5,
      delay,
      ease: "easeInOut",
    }}
  />
);

const EmailSection: FC = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const resetForm = () => {
    setFormData({
      from_name: "",
      email: "",
      message: "",
    });
  };

  const circles = [
    {
      size: "w-32 md:w-64 h-32 md:h-64",
      position: { top: "5%", left: "5%" },
      delay: 0,
    },
    {
      size: "w-48 md:w-96 h-48 md:h-96",
      position: { top: "15%", right: "2%" },
      delay: 0.5,
    },
    {
      size: "w-36 md:w-72 h-36 md:h-72",
      position: { bottom: "35%", left: "2%" },
      delay: 1,
    },
    {
      size: "w-40 md:w-80 h-40 md:h-80",
      position: { bottom: "10%", right: "8%" },
      delay: 1.5,
    },
    {
      size: "w-24 md:w-48 h-24 md:h-48",
      position: { top: "45%", left: "20%" },
      delay: 2,
    },
    {
      size: "w-28 md:w-56 h-28 md:h-56",
      position: { bottom: "40%", right: "20%" },
      delay: 2.5,
    },
  ];

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      showNotification("error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_name: formData.from_name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save message");
      }

      await response.json();
      showNotification("success", "Message sent successfully!");
      resetForm();
    } catch (error: any) {
      console.error("Error details:", error);
      showNotification("error", "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-cblack flex flex-col md:flex-row p-4 md:p-8 relative overflow-hidden">
      {circles.map((circle, i) => (
        <FloatingCircle
          key={i}
          delay={circle.delay}
          size={circle.size}
          position={circle.position}
        />
      ))}

      <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row p-4 md:p-8">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col justify-center mb-8 md:mb-0">
          <div className="text-4xl md:text-6xl font-code text-cwhite mb-8 md:mb-16">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              Turning <span className="text-cyellow">coffee</span>
            </motion.span>
            <br />
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}>
              into <span className="text-cyellow">code,</span>
            </motion.span>
            <br />
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}>
              and <span className="text-cyellow">ideas</span>
            </motion.span>
            <br />
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}>
              into <span className="text-cyellow">gold.</span>
            </motion.span>
          </div>

          <div className="flex flex-col space-y-6">
            {["LinkedIn", "Resume", "Github"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-max space-x-4 text-cyellow hover:opacity-80 transition-opacity">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-cblack rounded-full flex items-center justify-center">
                    {item === "LinkedIn" && (
                      <Linkedin size={32} className="text-cyellow" />
                    )}
                    {item === "Resume" && (
                      <FileText size={32} className="text-cyellow" />
                    )}
                    {item === "Github" && (
                      <Github size={32} className="text-cyellow" />
                    )}
                  </motion.div>
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="text-2xl font-oswald">
                    {item}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full md:w-4/5 bg-cgray rounded-lg p-4 md:p-6">
            <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 p-4 rounded-lg ${
                    notification.type === "success"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}>
                  {notification.message}
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              className="h-full flex flex-col space-y-4">
              <div className="space-y-4 flex-grow">
                {["name", "email", "message"].map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}>
                    {field === "message" ? (
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Your Message"
                        required
                        className="w-full h-48 bg-cblack rounded-lg p-4 text-cwhite font-martel focus:outline-none focus:ring-2 focus:ring-cyellow resize-none transition-all duration-300 hover:bg-opacity-80"
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field === "email" ? "email" : "from_name"}
                        value={
                          field === "email"
                            ? formData.email
                            : formData.from_name
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field === "email" ? "email" : "from_name"]:
                              e.target.value,
                          })
                        }
                        placeholder={`Your ${
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }`}
                        required
                        className="w-full h-12 bg-cblack rounded-lg px-4 text-cwhite font-martel focus:outline-none focus:ring-2 focus:ring-cyellow transition-all duration-300 hover:bg-opacity-80"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-16 bg-cyellow text-cblack font-oswald text-2xl rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50">
                  {isLoading ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EmailSection;
