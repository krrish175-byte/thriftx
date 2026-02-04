import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import { Camera, X, ChevronLeft, ChevronRight, AlertCircle, Trash2, ArrowLeft, ArrowRight, Image as ImageIcon, FileText, Tag, Ruler, CheckCircle, Smartphone, Home, Book, Watch, Shirt, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import { motion, AnimatePresence } from 'framer-motion';

const Sell = () => {
    const navigate = useNavigate();

    // --- State ---
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Camera State
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [stream, setStream] = useState(null);
    const [images, setImages] = useState([]); // Array of File objects
    const [previewImages, setPreviewImages] = useState([]); // Array of { src, isLowQuality }

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        itemType: '',
        condition: 'Good',
        conditionGrade: 'A-',
        brand: '',
        color: '',
        size: '',
        material: '',
        usageDuration: '',
        originalPrice: '',
        price: '',
        description: '',
        measurements: { length: '', width: '', height: '' },
        isNegotiable: true
    });

    // --- Steps Configuration ---
    const steps = [
        { label: 'Photos', id: 1, icon: Camera },
        { label: 'Review', id: 2, icon: Edit },
        { label: 'Details', id: 3, icon: FileText },
        { label: 'Category', id: 4, icon: Tag },
        { label: 'Specs', id: 5, icon: Ruler },
        { label: 'Finish', id: 6, icon: CheckCircle }
    ];

    // Categories Configuration for Grid
    // Categories Configuration for Grid
    const categories = [
        {
            id: 'Clothing',
            icon: Shirt,
            color: 'text-green-400',
            impact: 'High',
            requirements: {
                required: 'size, measurements, fit_type',
                optional: 'brand, color, material, care_instructions',
                measurements: 'chest, waist, length, shoulder, sleeve'
            }
        },
        {
            id: 'Footwear',
            icon: '👟',
            isEmoji: true,
            color: 'text-purple-400',
            impact: 'High',
            requirements: {
                required: 'size, measurements',
                optional: 'brand, color, sole_type',
                measurements: 'length, width, heel_height'
            }
        },
        {
            id: 'Accessories',
            icon: Watch,
            color: 'text-pink-400',
            impact: 'Medium',
            requirements: {
                required: 'material',
                optional: 'brand, color, size',
                measurements: 'length, width, circumference'
            }
        },
        {
            id: 'Gadgets',
            icon: Smartphone,
            color: 'text-blue-400',
            impact: 'High',
            requirements: {
                required: 'brand, model, condition',
                optional: 'warranty, accessories, original_box',
                measurements: null
            }
        },
        {
            id: 'Dorm Essentials',
            icon: Home,
            color: 'text-orange-400',
            impact: 'Medium',
            requirements: {
                required: 'condition',
                optional: 'brand, color, material',
                measurements: 'length, width, height'
            }
        },
        {
            id: 'Books & Stationery',
            icon: Book,
            color: 'text-yellow-400',
            impact: 'Low',
            requirements: {
                required: 'author, brief',
                optional: null,
                measurements: null
            }
        }
    ];

    // Condition Grades
    const conditionGrades = [
        { id: 'A+', label: 'Brand New', desc: 'Never used, with tags' },
        { id: 'A', label: 'Like New', desc: 'Used once or twice' },
        { id: 'A-', label: 'Good', desc: 'Some wear, still great' },
        { id: 'B', label: 'Fair', desc: 'Visible wear, functional' }
    ];

    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
        } else {
            setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        }
    };

    const handleCategorySelect = (catId) => {
        setFormData({ ...formData, category: catId });
    };

    const handleConditionSelect = (gradeId) => {
        setFormData({ ...formData, conditionGrade: gradeId });
    };

    // --- Camera Logic ---
    const startCamera = async () => {
        setIsCameraOpen(true);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
            });
            setStream(mediaStream);
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
        } catch (err) {
            console.error("Camera Error:", err);
            alert("Unable to access camera.");
            setIsCameraOpen(false);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraOpen(false);
    };

    useEffect(() => {
        return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
    }, [stream]);

    const capturePhoto = () => {
        if (images.length >= 8) {
            alert("Maximum 8 images allowed");
            return;
        }
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL('image/jpeg');
            const isLowQuality = video.videoWidth < 720 || video.videoHeight < 720;

            setPreviewImages([...previewImages, { src: dataUrl, isLowQuality }]);
            const arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]);
            let n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) u8arr[n] = bstr.charCodeAt(n);
            setImages([...images, new File([u8arr], `capture_${Date.now()}.jpg`, { type: mime })]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    const moveImage = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < images.length) {
            const newImages = [...images];
            const newPreviews = [...previewImages];
            [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
            [newPreviews[index], newPreviews[newIndex]] = [newPreviews[newIndex], newPreviews[index]];
            setImages(newImages);
            setPreviewImages(newPreviews);
        }
    };

    // --- Navigation Logic ---
    const handleNext = () => {
        try {
            if (currentStep === 1) {
                if (images.length < 1) return alert("Please take at least 1 photo.");
                stopCamera();
            }
            if (currentStep === 3) {
                if (!formData.title || !formData.price) return alert("Please fill in Title and Price.");
            }
            if (currentStep === 4) {
                if (!formData.category) return alert("Please select a category.");
            }
            setCurrentStep(prev => Math.min(prev + 1, 6));
        } catch (error) {
            console.error("Navigation Error:", error);
        }
    };

    const handleBack = () => {
        if (currentStep === 1 && isCameraOpen) {
            stopCamera();
        } else {
            setCurrentStep(prev => Math.max(prev - 1, 1));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (typeof formData[key] === 'object' && key !== 'images') {
                    data.append(key, JSON.stringify(formData[key]));
                } else {
                    data.append(key, formData[key]);
                }
            });
            images.forEach(image => data.append('images', image));

            await api.post('/products', data);
            navigate('/dashboard');
        } catch (error) {
            console.error("Publish Error:", error);
            const errorMsg = error.response?.data?.msg || error.response?.data?.error || error.message || "Unknown error occurred";
            alert(`Failed to create listing: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    // --- Render Cases ---
    const renderStepContent = () => {
        const selectedCategoryData = categories.find(c => c.id === formData.category);

        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {(() => {
                        switch (currentStep) {
                            case 1: // PHOTOS
                                return !isCameraOpen ? (
                                    <>
                                        <motion.div onClick={startCamera} className="cursor-pointer group text-center py-20 bg-slate-900 mx-auto max-w-sm rounded-[32px] border border-slate-800 hover:border-slate-700 transition-all shadow-2xl relative overflow-hidden" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="w-24 h-24 bg-slate-950 rounded-full flex items-center justify-center mb-6 mx-auto transition-transform group-hover:scale-110 ring-1 ring-slate-800 shadow-xl group-hover:shadow-blue-500/20">
                                                <Camera size={40} className="text-blue-400" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Tap to Open Camera</h3>
                                            <p className="text-slate-500 px-6">Take high quality photos for better visibility. At least 3 photos recommended.</p>
                                        </motion.div>
                                        <div className="mt-8 flex gap-3 flex-wrap justify-center">
                                            {previewImages.map((img, i) => (
                                                <img key={i} src={img.src} className="w-16 h-16 object-cover rounded-lg border border-slate-700 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300" />
                                            ))}
                                        </div>
                                    </>
                                ) : null;

                            case 2: // REVIEW
                                return (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h2 className="text-3xl font-serif text-white mb-2">Review Your Photos</h2>
                                            <p className="text-slate-400">Reorder, remove, or improve for the best listing</p>
                                        </div>
                                        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <AnimatePresence>
                                                {previewImages.map((img, idx) => (
                                                    <motion.div layout key={img.src} className="group relative aspect-square bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                                                        <img src={img.src} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-500 group-hover:scale-105" />
                                                        {img.isLowQuality && (
                                                            <div className="absolute top-2 left-2 right-2 bg-red-500/90 text-white text-[10px] px-2 py-1.5 rounded-lg flex items-center gap-1.5 font-bold backdrop-blur-md shadow-lg">
                                                                <AlertCircle size={12} fill="currentColor" className="text-red-200" /> Low Quality
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/90 to-transparent pt-10">
                                                            <button onClick={() => moveImage(idx, -1)} disabled={idx === 0} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-20 transition border border-white/10"><ArrowLeft size={14} /></button>
                                                            <button onClick={() => removeImage(idx)} className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 shadow-lg shadow-red-500/20 transition"><Trash2 size={14} /></button>
                                                            <button onClick={() => moveImage(idx, 1)} disabled={idx === images.length - 1} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-20 transition border border-white/10"><ArrowRight size={14} /></button>
                                                        </div>
                                                        <div className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white text-xs flex items-center justify-center rounded-full border border-white/10 font-mono shadow-lg">{idx + 1}</div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </motion.div>
                                        <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/20 flex gap-4 text-slate-300 text-sm">
                                            <AlertCircle className="text-blue-400 shrink-0" size={24} />
                                            <div>
                                                <strong className="text-blue-200 block mb-1">Photo Tips:</strong>
                                                <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs">
                                                    <li>First photo is your <b>Cover Image</b></li>
                                                    <li>Remove blurry or dark shots</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );

                            case 3: // DETAILS
                                return (
                                    <div className="max-w-md mx-auto">
                                        <div className="text-center mb-8">
                                            <h2 className="text-3xl font-serif text-white mb-2">The Basics</h2>
                                            <p className="text-slate-400">Tell us what you're selling</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Title</label>
                                                <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Vintage Nike Hoodie" className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-slate-600 shadow-inner" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Price (₹)</label>
                                                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0" className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 outline-none transition font-mono text-lg" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Original Price</label>
                                                    <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="Optional" className="w-full bg-slate-900 border border-slate-800 text-slate-400 px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 outline-none transition" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Brand</label>
                                                <input name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Zara, H&M" className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 outline-none transition" />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Description</label>
                                                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe condition, fit, and any flaws..." className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 outline-none transition resize-none"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                );

                            case 4: // CATEGORY
                                return (
                                    <div className="space-y-8">
                                        <div className="text-center mb-8">
                                            <h2 className="text-3xl font-serif text-white mb-2">Choose Category</h2>
                                            <p className="text-slate-400">Select the category that best fits your item</p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {categories.map((cat) => (
                                                <motion.div
                                                    key={cat.id}
                                                    onClick={() => handleCategorySelect(cat.id)}
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden group min-h-[160px] flex flex-col ${formData.category === cat.id ? 'bg-slate-800 border-white/20 shadow-xl' : 'bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700'}`}
                                                >
                                                    <div className={`w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center mb-auto text-2xl shadow-inner ${formData.category === cat.id ? 'text-white' : cat.color}`}>
                                                        {cat.isEmoji ? <span className="text-2xl">{cat.icon}</span> : <cat.icon size={24} />}
                                                    </div>
                                                    <div>
                                                        <h3 className={`font-bold text-base mb-1 ${formData.category === cat.id ? 'text-white' : 'text-slate-300'}`}>{cat.id}</h3>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block">{cat.impact} IMPACT</span>
                                                    </div>

                                                    {formData.category === cat.id && (
                                                        <div className="absolute top-4 right-4 text-white"><CheckCircle size={20} fill="currentColor" className="text-white" /></div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Requirements Info Box */}
                                        <AnimatePresence>
                                            {selectedCategoryData && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800/80 flex gap-5 backdrop-blur-sm"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 text-slate-400">
                                                        <AlertCircle size={20} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-serif text-white mb-3">Requirements for {selectedCategoryData.id}</h4>
                                                        <div className="space-y-2 text-sm text-slate-400">
                                                            <div className="flex gap-2">
                                                                <span className="text-slate-500 font-bold text-xs uppercase tracking-wider shrink-0 mt-0.5">• Required:</span>
                                                                <span className="text-slate-300">{selectedCategoryData.requirements.required}</span>
                                                            </div>
                                                            {selectedCategoryData.requirements.optional && (
                                                                <div className="flex gap-2">
                                                                    <span className="text-slate-500 font-bold text-xs uppercase tracking-wider shrink-0 mt-0.5">• Optional:</span>
                                                                    <span className="text-slate-300">{selectedCategoryData.requirements.optional}</span>
                                                                </div>
                                                            )}
                                                            {selectedCategoryData.requirements.measurements && (
                                                                <div className="flex gap-2">
                                                                    <span className="text-slate-500 font-bold text-xs uppercase tracking-wider shrink-0 mt-0.5">• Measurements:</span>
                                                                    <span className="text-slate-300">{selectedCategoryData.requirements.measurements}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );

                            case 5: // SPECS
                                const requiredFields = selectedCategoryData?.requirements?.required?.split(',').map(s => s.trim().toLowerCase()) || [];

                                const renderField = (field) => {
                                    switch (field) {
                                        case 'size':
                                            return (
                                                <div key="size">
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Size</label>
                                                    <input name="size" value={formData.size} onChange={handleChange} placeholder="e.g. M, 42" className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl outline-none focus:border-blue-500 transition" />
                                                </div>
                                            );
                                        case 'color':
                                            return (
                                                <div key="color">
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Color</label>
                                                    <input name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Navy Blue" className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl outline-none focus:border-blue-500 transition" />
                                                </div>
                                            );
                                        case 'condition':
                                            return (
                                                <div key="condition">
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Condition Grade</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {conditionGrades.map((grade) => (
                                                            <div
                                                                key={grade.id}
                                                                onClick={() => handleConditionSelect(grade.id)}
                                                                className={`cursor-pointer p-5 rounded-2xl border transition-all ${formData.conditionGrade === grade.id ? 'bg-slate-800 border-white/60' : 'bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700'}`}
                                                            >
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className={`font-bold text-lg ${formData.conditionGrade === grade.id ? 'text-white' : 'text-slate-300'}`}>{grade.id}</span>
                                                                    {formData.conditionGrade === grade.id && <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"></div>}
                                                                </div>
                                                                <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${formData.conditionGrade === grade.id ? 'text-white' : 'text-slate-400'}`}>{grade.label}</p>
                                                                <p className="text-[10px] text-slate-500">{grade.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        case 'measurements':
                                            if (!selectedCategoryData.requirements.measurements) return null;
                                            const measures = selectedCategoryData.requirements.measurements.split(',').map(m => m.trim());
                                            return (
                                                <div key="measurements">
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Measurements (cm)</label>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {measures.map(m => (
                                                            <input key={m} name={`measurements.${m.toLowerCase()}`} placeholder={m} value={formData.measurements?.[m.toLowerCase()] || ''} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 text-white px-3 py-4 rounded-2xl text-center outline-none focus:border-blue-500 transition" />
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        case 'author':
                                            return (
                                                <div key="author">
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Author</label>
                                                    <input name="author" value={formData.author || ''} onChange={handleChange} placeholder="e.g. J.K. Rowling" className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl outline-none focus:border-blue-500 transition" />
                                                </div>
                                            );
                                        case 'brief':
                                            return (
                                                <div key="brief">
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Brief Summary</label>
                                                    <textarea name="brief" value={formData.brief || ''} onChange={handleChange} rows="3" placeholder="Short summary of the book..." className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl outline-none focus:border-blue-500 transition resize-none"></textarea>
                                                </div>
                                            );
                                        default:
                                            // Generic text input for other fields like brand, model, material, etc.
                                            return (
                                                <div key={field}>
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">{field.replace('_', ' ')}</label>
                                                    <input name={field} value={formData[field] || ''} onChange={handleChange} placeholder={`Enter ${field.replace('_', ' ')}`} className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl outline-none focus:border-blue-500 transition" />
                                                </div>
                                            );
                                    }
                                };

                                return (
                                    <div className="space-y-8 max-w-lg mx-auto">
                                        <div className="text-center">
                                            <h2 className="text-3xl font-serif text-white mb-2">Specifications</h2>
                                            <p className="text-slate-400">Add details for {formData.category || 'your item'}</p>
                                        </div>

                                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex gap-3">
                                            <div className="w-1 h-full bg-slate-700 rounded-full"></div>
                                            <div className="text-xs">
                                                <strong className="text-white block mb-1">Requirements for {formData.category}</strong>
                                                <ul className="list-disc list-inside text-slate-400 space-y-1">
                                                    <li className="capitalize">Required: {requiredFields.join(', ')}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Dynamic Form Generation */}
                                            {requiredFields.map(field => renderField(field))}

                                            <div className="flex items-center gap-3 p-5 bg-slate-900 rounded-2xl border border-slate-800">
                                                <input type="checkbox" name="isNegotiable" checked={formData.isNegotiable} onChange={handleChange} className="w-5 h-5 accent-blue-500 rounded cursor-pointer" />
                                                <label className="text-sm text-slate-300 font-medium select-none">Price is negotiable</label>
                                            </div>
                                        </div>
                                    </div>
                                );

                            case 6: // FINISH (Final Review)
                                return (
                                    <div className="space-y-8 max-w-sm mx-auto">
                                        <div className="text-center">
                                            <h2 className="text-3xl font-serif text-white mb-2">Final Review</h2>
                                            <p className="text-slate-400">Ready to publish your listing?</p>
                                        </div>

                                        <div className="bg-slate-900 rounded-[32px] overflow-hidden border border-slate-800 shadow-2xl relative group">
                                            {/* Cover Image */}
                                            <div className="relative aspect-[4/5] bg-black">
                                                {previewImages[0] && <img src={previewImages[0].src} className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                                                <div className="absolute bottom-0 left-0 right-0 p-8 pt-32 text-white">
                                                    <h3 className="text-3xl font-bold font-serif leading-tight mb-2">{formData.title}</h3>
                                                    <div className="text-xl font-medium opacity-90">₹{formData.price}</div>
                                                </div>
                                            </div>

                                            {/* Summary Details */}
                                            <div className="p-8 pt-0 grid grid-cols-2 gap-y-6 gap-x-4 text-sm bg-slate-950 relative z-10 -mt-2">
                                                <div>
                                                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Category</label>
                                                    <div className="text-slate-200 font-medium">{formData.category}</div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Brand</label>
                                                    <div className="text-slate-200 font-medium">{formData.brand || '-'}</div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Size</label>
                                                    <div className="text-slate-200 font-medium">{formData.size || '-'}</div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Condition</label>
                                                    <div className="text-slate-200 font-medium flex items-center gap-2">
                                                        {formData.conditionGrade}
                                                        <span className="text-[10px] text-slate-500 px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">
                                                            {conditionGrades.find(g => g.id === formData.conditionGrade)?.label}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 pt-2 border-t border-slate-900/50">
                                                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Description</label>
                                                    <div className="text-slate-400 text-xs italic line-clamp-2 leading-relaxed">{formData.description || 'No description provided'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                        }
                    })()}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-4">
                <Stepper currentStep={currentStep} steps={steps} />

                <motion.div
                    layout
                    className={`rounded-[40px] shadow-2xl overflow-hidden min-h-[600px] flex flex-col border transition-colors duration-500 ${currentStep === 1 && isCameraOpen ? 'bg-slate-950 border-slate-900 ring-1 ring-slate-800' : 'bg-slate-950 border-slate-900'
                        }`}
                >
                    <div className="flex-1 p-6 md:p-10 relative">
                        {/* Step 1 Specific Layout Overrides if Camera Open */}
                        {currentStep === 1 && isCameraOpen ? (
                            <div className="flex flex-col h-full gap-6">
                                {/* Top Section: Previews */}
                                <div className="flex flex-col gap-4 min-h-[120px]">
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center px-4">
                                        <AnimatePresence mode='popLayout'>
                                            {previewImages.map((img, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    className="relative shrink-0"
                                                >
                                                    <img src={img.src} className="w-24 h-24 object-cover rounded-2xl border-2 border-slate-800 shadow-xl" />
                                                    <div className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full border border-slate-700 font-bold z-10 shadow-lg">
                                                        {i + 1}
                                                    </div>
                                                </motion.div>
                                            ))}
                                            {previewImages.length === 0 && (
                                                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 text-[10px] text-center p-2 gap-2">
                                                    <Camera size={16} />
                                                    <span>No photos</span>
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest justify-center">
                                        <span className="text-slate-500">{images.length} of 8</span>
                                        <span className="text-slate-700">|</span>
                                        <span className={images.length >= 3 ? "text-green-500" : "text-amber-500"}>{images.length >= 3 ? "Minimum Met" : "Min 3 Recommended"}</span>
                                    </div>
                                </div>

                                {/* Camera View */}
                                <div className="flex-1 relative rounded-[32px] overflow-hidden bg-black shadow-2xl border border-slate-800 ring-4 ring-slate-900">
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                                    <canvas ref={canvasRef} className="hidden"></canvas>
                                </div>

                                {/* Camera Footer */}
                                <div className="bg-white rounded-[24px] p-4 flex justify-between items-center shadow-xl mx-4 mb-2">
                                    <button onClick={stopCamera} className="w-12 h-12 flex items-center justify-center text-slate-900 hover:bg-slate-100 rounded-full transition">
                                        <X size={24} />
                                    </button>
                                    <button
                                        onClick={capturePhoto}
                                        disabled={images.length >= 8}
                                        className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-3 shadow-lg shadow-blue-500/30 text-lg active:scale-95 duration-200"
                                    >
                                        <Camera size={24} /> Capture
                                    </button>
                                    <div className="w-12"></div>
                                </div>
                            </div>
                        ) : (
                            renderStepContent()
                        )}
                    </div>

                    {/* Global Footer Navigation */}
                    {!isCameraOpen && (
                        <div className="p-8 border-t border-slate-900 bg-slate-950 flex justify-between items-center relative z-50">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm tracking-wide uppercase transition disabled:opacity-0 disabled:pointer-events-none text-slate-500 hover:bg-slate-900 hover:text-white"
                            >
                                <ChevronLeft size={18} /> Back
                            </motion.button>


                            {currentStep < 6 ? (
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNext}
                                    className="flex items-center gap-3 px-10 py-4 bg-white text-slate-950 rounded-2xl font-bold text-sm tracking-wide uppercase hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition cursor-pointer"
                                >
                                    Next Step <ChevronRight size={18} />
                                </motion.button>
                            ) : (
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex items-center gap-3 px-10 py-4 bg-white text-slate-950 rounded-2xl font-bold text-sm tracking-wide uppercase hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition disabled:opacity-70 cursor-pointer"
                                >
                                    {loading ? 'Listing...' : 'Publish'}
                                </motion.button>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Sell;
