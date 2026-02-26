import { useState, useEffect } from 'react';
import { CircularDoublyLinkedList } from './structures/circularDoublyLinkedList';
import ProductCarousel from './components/ProductCarousel';
import './index.css';

// Mock data
const mockProducts = [
    {
        id: 1,
        name: 'Wireless Noise-Canceling Headphones',
        price: 299.99,
        description: 'Experience pure audio with our top-tier active noise-canceling headphones.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop'
    },
    {
        id: 2,
        name: 'Smart Fitness Watch',
        price: 149.50,
        description: 'Track your health, workouts, and sleep patterns with precision.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop'
    },
    {
        id: 3,
        name: 'Professional Camera Lens',
        price: 899.00,
        description: 'Capture stunning landscapes with this ultra-wide prime lens.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop'
    },
    {
        id: 4,
        name: 'Mechanical Gaming Keyboard',
        price: 129.95,
        description: 'RGB backlit mechanical keyboard with tactile blue switches.',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=400&fit=crop'
    },
    {
        id: 5,
        name: 'Ergonomic Office Chair',
        price: 249.99,
        description: 'Say goodbye to back pain with our fully adjustable ergonomic chair.',
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&h=400&fit=crop'
    },
    {
        id: 6,
        name: '4K Ultra HD Monitor',
        price: 399.00,
        description: 'Crystal clear visuals for ultimate productivity and entertainment.',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop'
    }
];

function App() {
    const [productList, setProductList] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    // Initialize the list once on mount
    useEffect(() => {
        const list = new CircularDoublyLinkedList();
        mockProducts.forEach(product => list.append(product));

        setProductList(list);
        setCurrentNode(list.getHead());
        setCurrentIndex(1);
    }, []);

    // Handlers for navigation
    const handleNext = () => {
        if (currentNode) {
            setCurrentNode(currentNode.next);
            setCurrentIndex(prev => prev === productList.size() ? 1 : prev + 1);
            // Pause autoplay on user interaction
            setIsAutoPlay(false);
        }
    };

    const handlePrev = () => {
        if (currentNode) {
            setCurrentNode(currentNode.prev);
            setCurrentIndex(prev => prev === 1 ? productList.size() : prev - 1);
            // Pause autoplay on user interaction
            setIsAutoPlay(false);
        }
    };

    // Requirement 5: Auto-play with useEffect
    useEffect(() => {
        if (!isAutoPlay || !currentNode) return;

        const intervalId = setInterval(() => {
            setCurrentNode(prevNode => {
                if (!prevNode) return prevNode;
                setCurrentIndex(prev => prev === productList.size() ? 1 : prev + 1);
                return prevNode.next;
            });
            console.log('Automated transition to next product');
        }, 2500);

        return () => clearInterval(intervalId);
    }, [isAutoPlay, currentNode, productList]);

    if (!productList || !currentNode) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ paddingTop: '2rem' }}>
            <h1>Practice 02 - Carousel</h1>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem' }}>
                {isAutoPlay ? "Auto-play is ON (Interact to Pause)" : "Auto-play is PAUSED"}
            </p>

            <ProductCarousel
                product={currentNode.value}
                onNext={handleNext}
                onPrev={handlePrev}
                currentIndex={currentIndex}
                totalItems={productList.size()}
            />
        </div>
    );
}

export default App;
