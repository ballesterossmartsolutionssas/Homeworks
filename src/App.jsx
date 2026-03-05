import { useEffect, useRef, useState } from 'react';
import { LinkedList } from './structures/linkedList';
import { DoublyLinkedList } from './structures/doublyLinkedList';
import { CircularLinkedList } from './structures/circularLinkedList';
import { DoublyCircularLinkedList } from './structures/doublyCircularLinkedList';
import AvailableVehicles from './components/AvailableVehicles';
import RentalHistory from './components/RentalHistory';
import FeaturedVehicle from './components/FeaturedVehicle';
import ActiveInvestors from './components/ActiveInvestors';
import './index.css';

const INITIAL_VEHICLES = [
    { id: 1, plate: 'BGT-102', model: 'Renault Kwid', type: 'Compacto' },
    { id: 2, plate: 'MED-887', model: 'Kia Picanto', type: 'Hatchback' },
    { id: 3, plate: 'CLO-451', model: 'Chevrolet Tracker', type: 'SUV' },
    { id: 4, plate: 'BGA-774', model: 'Toyota Corolla Cross', type: 'Hibrido' }
];

const INITIAL_INVESTORS = [
    { id: 1, name: 'Laura Diaz', amount: '$80.000.000', role: 'Capital semilla' },
    { id: 2, name: 'Sebastian Ruiz', amount: '$120.000.000', role: 'Expansion flota' },
    { id: 3, name: 'Camila Mora', amount: '$65.000.000', role: 'Tecnologia' }
];

function App() {
    const [availableVehicles] = useState(() => new LinkedList());
    const [rentalHistory] = useState(() => new DoublyLinkedList());
    const [featuredVehicles] = useState(() => new CircularLinkedList());
    const [activeInvestors] = useState(() => new DoublyCircularLinkedList());
    const [currentFeaturedNode, setCurrentFeaturedNode] = useState(null);
    const [, setRenderVersion] = useState(0);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        INITIAL_VEHICLES.forEach((vehicle) => {
            availableVehicles.append(vehicle);
            featuredVehicles.append(vehicle);
        });

        INITIAL_INVESTORS.forEach((investor) => {
            activeInvestors.append(investor);
        });

        setCurrentFeaturedNode(featuredVehicles.getHead());
        setRenderVersion((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentFeaturedNode((previousNode) => {
                if (featuredVehicles.size() === 0) return null;
                if (!previousNode) return featuredVehicles.getHead();
                return previousNode.next;
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [featuredVehicles]);

    const handleRentVehicle = (vehicleId) => {
        const removedVehicleNode = availableVehicles.removeById(vehicleId);
        if (!removedVehicleNode) return;

        rentalHistory.append({
            id: Date.now() + vehicleId,
            vehicle: removedVehicleNode.value,
            rentedAt: new Date().toLocaleString('es-CO')
        });

        const removedFromFeatured = featuredVehicles.removeById(vehicleId);

        if (removedFromFeatured && featuredVehicles.size() === 0) {
            setCurrentFeaturedNode(null);
        } else if (
            removedFromFeatured &&
            currentFeaturedNode &&
            currentFeaturedNode.value.id === vehicleId
        ) {
            setCurrentFeaturedNode(featuredVehicles.getHead());
        }

        setRenderVersion((prev) => prev + 1);
    };

    const availableVehiclesArray = availableVehicles.toArray();
    const rentalHistoryArray = rentalHistory.toArray();
    const activeInvestorsArray = activeInvestors.toArray();
    const featuredVehicle = currentFeaturedNode ? currentFeaturedNode.value : null;

    return (
        <div className="app-container">
            <header className="page-header">
                <h1>Parcial 1 - Movilidad Urbana</h1>
                <p>Gestion de vehiculos, alquileres e inversionistas con listas enlazadas</p>
                <p className="author-line">Presentado por: Juan Camilo Ballesteros Sierra - Codigo 2230721</p>
            </header>

            <section className="top-grid">
                <AvailableVehicles
                    vehicles={availableVehiclesArray}
                    onRentVehicle={handleRentVehicle}
                />
                <RentalHistory history={rentalHistoryArray} />
            </section>

            <section className="bottom-grid">
                <FeaturedVehicle vehicle={featuredVehicle} />
                <ActiveInvestors investors={activeInvestorsArray} />
            </section>
        </div>
    );
}

export default App;
