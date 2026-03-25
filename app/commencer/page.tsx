"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Building2, 
  Code, Globe, Smartphone, PenTool, 
  ArrowRight, ArrowLeft, CheckCircle2, Loader2, Sparkles as SparklesIcon, Send, Download
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import ThreeBackground from "@/components/ThreeBackground";

const SERVICES = [
  { id: "web", title: "Site Web", icon: Globe, description: "Création de site vitrine ou e-commerce moderne et performant." },
  { id: "webapp", title: "Application Web", icon: Code, description: "Plateforme sur mesure, SaaS, CRM ou outil interne complexe." },
  { id: "mobile", title: "Application Mobile", icon: Smartphone, description: "Application iOS et Android native ou multiplateforme." },
  { id: "design", title: "UI/UX Design", icon: PenTool, description: "Conception d'interface utilisateur et expérience utilisateur." },
];

export default function CommencerPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    details: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        toast.error("Veuillez remplir votre nom et email.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.service) {
        toast.error("Veuillez sélectionner un service.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (step < 3) {
      nextStep();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: SERVICES.find(s => s.id === formData.service)?.title || formData.service
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Demande envoyée avec succès !");
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles communs pour les inputs
  const inputStyle = "w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all";
  const labelStyle = "block text-sm font-medium text-slate-300 mb-1.5 ml-1";

  const handleDownloadPDF = async () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const img = new window.Image();
      img.src = '/pdf-bg.jpg';
      
      const generateContent = (pdfDoc: jsPDF) => {
        pdfDoc.setTextColor(255, 255, 255);
        pdfDoc.setFontSize(22);
        pdfDoc.setFont("helvetica", "bold");
        pdfDoc.text("Récapitulatif de votre Projet", 20, 40);
        
        pdfDoc.setFontSize(14);
        pdfDoc.setFont("helvetica", "normal");
        pdfDoc.text(`Date : ${new Date().toLocaleDateString()}`, 20, 60);

        pdfDoc.setFontSize(16);
        pdfDoc.setFont("helvetica", "bold");
        pdfDoc.text("Informations Client :", 20, 80);
        
        pdfDoc.setFontSize(12);
        pdfDoc.setFont("helvetica", "normal");
        pdfDoc.text(`Nom complet : ${formData.name}`, 20, 90);
        pdfDoc.text(`Email : ${formData.email}`, 20, 100);
        pdfDoc.text(`Téléphone : ${formData.phone || "Non renseigné"}`, 20, 110);
        pdfDoc.text(`Entreprise : ${formData.company || "Non renseignée"}`, 20, 120);
        
        pdfDoc.setFontSize(16);
        pdfDoc.setFont("helvetica", "bold");
        pdfDoc.text("Détails du Service :", 20, 140);
        
        pdfDoc.setFontSize(12);
        pdfDoc.setFont("helvetica", "normal");
        const serviceName = SERVICES.find(s => s.id === formData.service)?.title || formData.service;
        pdfDoc.text(`Service souhaité : ${serviceName}`, 20, 150);
        
        pdfDoc.text("Détails supplémentaires :", 20, 160);
        
        const splitDetails = pdfDoc.splitTextToSize(formData.details || "Aucun détail fourni.", 170);
        pdfDoc.text(splitDetails, 20, 170);
        
        pdfDoc.save("ArcaneCore_Projet.pdf");
      };

      img.onload = () => {
        doc.addImage(img, 'JPEG', 0, 0, 210, 297);
        generateContent(doc);
        toast.success("Le PDF a été généré avec succès.");
      };
      
      img.onerror = () => {
        // Fallback sans image
        const fallbackDoc = new jsPDF();
        fallbackDoc.setTextColor(0, 0, 0); // Texte en noir sur fond blanc
        generateContent(fallbackDoc);
        toast.warning("L'image de fond (pdf-bg.jpg) n'a pas été trouvée, PDF généré sans image.");
      };

    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la génération du PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans relative overflow-x-hidden flex flex-col w-full">
      {/* Background Effects (similar to ArcaneCore glassmorphic aesthetics) */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />
        <ThreeBackground />
      </div>
      
      {/* Navbar (Simplified) */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 w-full backdrop-blur-md bg-[#0a0a0f]/40 border-b border-white/5 sticky top-0 z-50">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
          ArcaneCore
        </Link>
        <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
          Retour à l'accueil
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
            <SparklesIcon className="w-4 h-4" />
            Démarrons votre projet
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
            Parlez-nous de <br className="md:hidden"/> votre vision
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Remplissez ce formulaire rapide pour nous aider à comprendre vos besoins. Nous vous répondrons dans les 24 heures.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 rounded-full z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-in-out" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step >= i 
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] border-2 border-blue-400" 
                    : "bg-slate-900 border-2 border-slate-700 text-slate-500"
                }`}
              >
                {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-400 mt-3 px-1">
            <span>Vos infos</span>
            <span className="translate-x-3">Services</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-slate-900/40 rounded-3xl blur-xl" />
          
          <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Demande envoyée !</h2>
                <p className="text-slate-400 mb-8 max-w-md">
                  Merci pour votre intérêt. Notre équipe va étudier votre demande et vous recontacter très rapidement.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleDownloadPDF}
                    className="flex flex-1 items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  >
                    <Download className="w-5 h-5" /> Télécharger la pièce jointe
                  </button>
                  <Link 
                    href="/"
                    className="flex flex-1 items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-medium transition-colors"
                  >
                    Retourner à l'accueil
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (step < 3) nextStep();
                else handleSubmit(e);
              }}>
                <AnimatePresence mode="wait">
                  {/* STEP 1: Personal Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <User className="text-blue-400" /> Vos informations
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelStyle}>Nom complet *</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                              type="text" 
                              name="name" 
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`${inputStyle} pl-12`}
                              placeholder="Jean Dupont"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className={labelStyle}>Adresse Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                              type="email" 
                              name="email" 
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`${inputStyle} pl-12`}
                              placeholder="jean@exemple.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className={labelStyle}>Téléphone</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                              type="tel" 
                              name="phone" 
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`${inputStyle} pl-12`}
                              placeholder="+33 6 12 34 56 78"
                            />
                          </div>
                        </div>

                        <div>
                          <label className={labelStyle}>Entreprise</label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                              type="text" 
                              name="company" 
                              value={formData.company}
                              onChange={handleInputChange}
                              className={`${inputStyle} pl-12`}
                              placeholder="Mon Entreprise SAS"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Service Selection */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <SparklesIcon className="text-purple-400" /> Type de service
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SERVICES.map((srv) => (
                          <div 
                            key={srv.id}
                            onClick={() => handleServiceSelect(srv.id)}
                            className={`relative cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 ${
                              formData.service === srv.id 
                                ? "bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)]" 
                                : "bg-slate-900/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/50"
                            }`}
                          >
                            {formData.service === srv.id && (
                              <div className="absolute top-4 right-4 text-blue-500">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                            )}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                              formData.service === srv.id ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-400"
                            }`}>
                              <srv.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-200 mb-2">{srv.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{srv.description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Review & Submit */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Send className="text-green-400" /> Finalisation
                      </h2>

                      <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Récapitulatif</h3>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-slate-800 pb-3">
                            <span className="text-slate-400">Nom complet</span>
                            <span className="font-medium text-slate-200">{formData.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-800 pb-3">
                            <span className="text-slate-400">Email</span>
                            <span className="font-medium text-slate-200">{formData.email}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-800 pb-3">
                            <span className="text-slate-400">Service choisi</span>
                            <span className="font-medium text-blue-400">
                              {SERVICES.find(s => s.id === formData.service)?.title}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={labelStyle}>Détails supplémentaires (Optionnel)</label>
                        <textarea 
                          name="details"
                          rows={4}
                          value={formData.details}
                          onChange={handleInputChange}
                          className={inputStyle}
                          placeholder="Parlez-nous un peu plus de votre projet..."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Controls */}
                <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`flex items-center gap-2 text-sm font-medium px-4 py-2 text-slate-400 hover:text-white transition-colors ${step === 1 ? 'invisible' : ''}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Précédent
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                    >
                      Suivant <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:cursor-not-allowed w-48"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Envoi...
                        </>
                      ) : (
                        <>
                          Envoyer la demande <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
