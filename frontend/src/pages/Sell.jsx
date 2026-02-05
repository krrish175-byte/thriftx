import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import { Camera, X, ChevronLeft, ChevronRight, AlertCircle, Trash2, ArrowLeft, ArrowRight, Tag, Ruler, CheckCircle, Smartphone, Home, Book, Watch, Shirt, FileText, Edit } from 'lucide-react';
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

    // --- Steps Configuration (Reordered) ---
    const steps = [
        { label: 'Category', id: 1, icon: Tag },
        { label: 'Specs', id: 2, icon: Ruler },
        { label: 'Visuals', id: 3, icon: Camera }, // Photos + Condition
        { label: 'Details', id: 4, icon: FileText } // Title, Desc, Price
    ];

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
            icon: null, // Emoji used in render
            isEmoji: true,
            emoji: '👟',
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
        const token = localStorage.getItem('token');
        if (!token) {
            alert("You must be logged in to sell an item.");
            navigate('/login');
        }
        return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
    }, [stream, navigate]);

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
                if (!formData.category) return alert("Please select a category.");
            }
            if (currentStep === 3) {
                if (!formData.conditionGrade) return alert("Please select the condition.");
                if (images.length < 1) return alert("Please take at least 1 photo.");
                stopCamera();
            }
            if (currentStep === 4) {
                // Validation on Submit (handled in handleSubmit)
            }
            setCurrentStep(prev => Math.min(prev + 1, 4));
        } catch (error) {
            console.error("Navigation Error:", error);
        }
    };

    const handleBack = () => {
        if (currentStep === 3 && isCameraOpen) {
            stopCamera();
        } else {
            setCurrentStep(prev => Math.max(prev - 1, 1));
        }
    };

    const handleSubmit = async () => {
        // Validation for Title, Price, Description
        if (!formData.title || !formData.price || !formData.description) {
            return alert("Please fill in all fields (Title, Price, Description).");
        }

        // Word Count Validation (Minimum 100 words)
        const wordCount = formData.description.trim().split(/\s+/).length;
        if (wordCount < 100) {
            return alert(`Description is too short. Please write at least 100 words (Current: ${wordCount}).`);
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert("Debug Error: Token is missing from storage! Redirecting to login...");
            navigate('/login');
            return;
        }

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

            await api.post('/products', data, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Publish Error:", error);
            if (error.response && error.response.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            let errorMsg = error.response?.data?.msg || error.response?.data?.error || error.message || "Unknown error occurred";
            if (typeof errorMsg === 'object') {
                errorMsg = JSON.stringify(errorMsg);
            }
            alert(`Failed to create listing: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const selectedCategoryData = categories.find(c => c.id === formData.category);

    // --- Render Cases ---
    const renderStepContent = () => {
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
                            case 1: // CATEGORY (Step 1)
                                return (
                                    <div className="space-y-8">
                                        <div className="text-center mb-8">
                                            <h2 className="text-3xl font-serif text-white mb-2">What are you selling?</h2>
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
                                                        {cat.isEmoji ? <span className="text-2xl">{cat.emoji}</span> : <cat.icon size={24} />}
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
                                    </div>
                                );

                            case 2: // SPECS (Step 2 - dependent on Category)
                                if (!selectedCategoryData) return <div>Please select a category first.</div>;

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
                                            return null; // Handled in next step
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
                                                    <textarea name="brief" value={formData.brief || ''} onChange={handleChange} rows="3" placeholder="Short summary..." className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl outline-none focus:border-blue-500 transition resize-none"></textarea>
                                                </div>
                                            );
                                        default:
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
                                            <h2 className="text-3xl font-serif text-white mb-2">{formData.category} Details</h2>
                                            <p className="text-slate-400">Tell us more about your item</p>
                                        </div>

                                        <div className="space-y-6">
                                            {requiredFields.map(field => renderField(field))}
                                            <div className="flex items-center gap-3 p-5 bg-slate-900 rounded-2xl border border-slate-800">
                                                <input type="checkbox" name="isNegotiable" checked={formData.isNegotiable} onChange={handleChange} className="w-5 h-5 accent-blue-500 rounded cursor-pointer" />
                                                <label className="text-sm text-slate-300 font-medium select-none">Price is negotiable</label>
                                            </div>
                                        </div>
                                    </div>
                                );

                            case 3: // VISUALS + CONDITION (Step 3)
                                return !isCameraOpen ? (
                                    <div className="space-y-8">
                                        <div className="text-center mb-6">
                                            <h2 className="text-3xl font-serif text-white mb-2">Show It Off</h2>
                                            <p className="text-slate-400">Photos & Condition</p>
                                        </div>

                                        {/* Condition Selection */}
                                        <div className="max-w-2xl mx-auto mb-8">
                                            <label className="block text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Item Condition</label>
                                            <div className="grid grid-cols-4 gap-3">
                                                {conditionGrades.map((grade) => (
                                                    <div
                                                        key={grade.id}
                                                        onClick={() => handleConditionSelect(grade.id)}
                                                        className={`cursor-pointer p-4 rounded-2xl border transition-all text-center ${formData.conditionGrade === grade.id ? 'bg-slate-800 border-white/60' : 'bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700'}`}
                                                    >
                                                        <span className={`block font-bold text-lg mb-1 ${formData.conditionGrade === grade.id ? 'text-white' : 'text-slate-300'}`}>{grade.id}</span>
                                                        <span className="text-[10px] text-slate-400 leading-tight block">{grade.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Camera Trigger */}
                                        <motion.div onClick={startCamera} className="cursor-pointer group text-center py-12 bg-slate-900 mx-auto max-w-sm rounded-[32px] border border-slate-800 hover:border-slate-700 transition-all shadow-2xl relative overflow-hidden" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center mb-4 mx-auto transition-transform group-hover:scale-110 ring-1 ring-slate-800 shadow-xl group-hover:shadow-blue-500/20">
                                                <Camera size={32} className="text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1">Open Camera</h3>
                                            <p className="text-slate-500 text-sm px-6">Take photos of your item</p>
                                        </motion.div>

                                        {/* Preview Grid */}
                                        {previewImages.length > 0 && (
                                            <div className="max-w-2xl mx-auto">
                                                <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest text-center">Your Photos ({previewImages.length}/8)</h4>
                                                <div className="grid grid-cols-4 gap-4">
                                                    {previewImages.map((img, idx) => (
                                                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                                                            <img src={img.src} alt="" className="w-full h-full object-cover" />
                                                            <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : null; // Camera view handled in main return

                            case 4: // DETAILS (Step 4)
                                return (
                                    <div className="max-w-2xl mx-auto text-center">
                                        <div className="text-center mb-8">
                                            <h2 className="text-3xl font-serif text-white mb-2">Final Details</h2>
                                            <p className="text-slate-400">Make it sound appealing!</p>
                                        </div>

                                        <div className="space-y-6 text-left">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Title</label>
                                                <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Vintage Nike Hoodie" className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 outline-none transition" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Price (₹)</label>
                                                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0" className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 outline-none transition text-lg font-mono" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Original Price</label>
                                                    <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="Optional" className="w-full bg-slate-900 border border-slate-800 text-slate-400 px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 outline-none transition" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Description (Min 100 words)</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    rows="6"
                                                    placeholder="Describe the condition, fit, history, and why you're selling it..."
                                                    className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500 outline-none transition resize-none leading-relaxed"
                                                />
                                                <div className="text-right mt-2 text-xs font-bold">
                                                    <span className={formData.description.trim().split(/\s+/).length < 100 ? "text-red-500" : "text-green-500"}>
                                                        {formData.description.trim() === '' ? 0 : formData.description.trim().split(/\s+/).length} / 100 words
                                                    </span>
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
                    className={`rounded-[40px] shadow-2xl overflow-hidden min-h-[600px] flex flex-col border transition-colors duration-500 ${currentStep === 3 && isCameraOpen ? 'bg-slate-950 border-slate-900 ring-1 ring-slate-800' : 'bg-slate-950 border-slate-900'}`}
                >
                    <div className="flex-1 p-6 md:p-10 relative">
                        {currentStep === 3 && isCameraOpen ? (
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
                                        </AnimatePresence>
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

                            {currentStep < 4 ? (
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
