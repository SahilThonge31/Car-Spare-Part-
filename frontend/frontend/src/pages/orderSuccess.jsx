import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

const OrderSuccess = () => {
  const [stage, setStage] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      size: Math.random() * 6 + 4
    }));
    setConfetti(particles);
    
    const timeline = [
      () => setShowText(true),
      () => setStage(1),
      () => setStage(2),
      () => setStage(3)
    ];

    timeline.forEach((action, index) => {
      setTimeout(action, (index + 1) * 600);
    });
  }, []);

  const stages = [
    { icon: CheckCircle, text: "Order Confirmed!", color: "text-green-500" },
    { icon: Package, text: "Processing Order", color: "text-blue-500" },
    { icon: Truck, text: "Ready for Shipping", color: "text-purple-500" }
  ];

  const Button = ({ onClick, children }) => (
    <button 
      onClick={onClick} 
      className="bg-green-500 hover:bg-green-600 text-white font-semibold w-full h-12 text-lg rounded-lg flex items-center justify-center gap-2"
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            animationDelay: `${particle.delay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: ['#10B981', '#6366F1', '#F59E0B'][particle.id % 3],
            borderRadius: '50%'
          }}
        />
      ))}

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-500 hover:scale-105">
        {/* Progress tracker */}
        {/* Progress tracker */}
<div className="flex justify-between mb-8 relative px-8">
  {/* Progress background bar - properly constrained inside padding */}
  <div className="absolute top-7 left-8 right-8 h-2 bg-gray-200">
    <div 
      className="h-full bg-green-500 transition-all duration-400"
      style={{ width: `${(stage / (stages.length)) * 100}%` }}
    />
  </div>

  {/* Progress stages */}
  {stages.map((s, index) => (
    <div key={index} className="z-10 flex flex-col items-center">
      <div 
        className={`rounded-full p-3 transition-all duration-500 ${
          index <= stage ? 'bg-green-100' : 'bg-gray-100'
        }`}
      >
        <s.icon 
          className={`w-8 h-8 ${
            index <= stage ? s.color : 'text-gray-400'
          }`}
        />
      </div>
      <p className={`mt-2 text-sm ${
        index <= stage ? 'text-gray-800' : 'text-gray-400'
      }`}>
        {s.text}
      </p>
    </div>
  ))}
</div>


        <div className={`transform transition-all duration-500 ${
          showText ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8 transform transition-all duration-500 hover:shadow-lg">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <div className="text-sm text-gray-600">
              <p>Estimated Delivery</p>
              <p className="font-semibold">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Button onClick={() => window.location.href = '/'}>
            <Home className="h-5 w-5" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

const styles = `
  @keyframes confetti {
    0% { transform: translateY(0) rotate(0); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  .animate-confetti {
    position: absolute;
    animation: confetti 4s ease-out forwards;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default OrderSuccess;