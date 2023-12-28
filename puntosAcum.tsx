import { useState, ChangeEvent } from 'react'
import { useEffect } from 'react';
import { FiDelete,FiChevronUp, FiChevronDown, FiArrowDown, FiArrowUp } from "react-icons/fi";
import {IoCloseSharp} from "react-icons/io5"
import './tecla.css'
import './cierre.css'
import './checador.css'
import './rspnsv.css'
import { TbLetterCaseUpper } from "react-icons/tb";
import { GoNumber } from "react-icons/go";
import { AiFillRightCircle, AiOutlineEnter } from "react-icons/ai";
import { BorraImagg } from '../interface/interfaceTabla';
import { GiMoneyStack } from "react-icons/gi";
import { BsCartCheck } from "react-icons/bs";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Red2000 from './Red2000.jpeg'
import chamarra from './chamarra.jpeg'
import { FaBarcode } from "react-icons/fa";
import {CircularProgressbarWithChildren} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"


interface VirtualKeyboardProps{
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
    activeInput: string;
    searchText: string;
    isFieldSelected: boolean;
    handleTecladoInput: (key: string) => void;
    id: string;
    InputValues: string;
    input: string;
    imageData: BorraIma[];
    addData: () => void;
    handleSearch: (e: React.FormEvent) => void;
    inputs: string;
    setInputs: React.Dispatch<React.SetStateAction<string>>;
    calcularMontoIVA: () => string;
    activeInputId: string;
  onInputChange: (newValue: string) => void;
}

interface ProductProps {
  name: string;
  code: string;
  price?: number;
  discount?: number;
  imageSrc: string;
}



export const VirtualKeyboard = () => {
const [imageData, setImageData] = useState<BorraImagg[]>([]);
const [originalData, setOriginalData] = useState<BorraImagg[]>([]);
const [formData, setFormData] = useState<BorraImagg>({cliente:'', puntos: '', producto:''});
const [porcentaje, setPorcentaje] = useState<number>(0);
const addData = () => {
  if (formData.puntos && formData.cliente && formData.producto) {
    const newData = { ...formData };
    setImageData([...imageData, newData]);
    setOriginalData([...originalData, newData]);
   setFormData({
      cliente: '',
      puntos: '',
      producto: '',
    });
      
  }
};
const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
      // Actualizar dinámicamente el porcentaje cuando cambia el input
      calcularPorcentaje();
};

const calcularPorcentaje = () => {
  const precioProducto = parseFloat(formData.producto);
  const puntosAcumulados = parseFloat(formData.puntos);

  if (!isNaN(precioProducto) && !isNaN(puntosAcumulados) && precioProducto !== 0) {
    const nuevoPorcentaje = (puntosAcumulados / precioProducto) * 100;
    setPorcentaje(isNaN(nuevoPorcentaje) ? 0 : nuevoPorcentaje.toFixed(2));
  } else {
    setPorcentaje(0);
  }
};

useEffect(() => {
  // Actualizar dinámicamente el porcentaje al cargar el componente
  calcularPorcentaje();
}, [formData]); // Dependencia añadida: el efecto se ejecutará cuando cambie formData

return (
  <div>
    <div className='containerr2 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
      <div className='h1responsive'>
      <div className='containerr1'>
         <label htmlFor="name"><strong>Cliente</strong></label>
         <input
           className='inputt'
           type="text"
           id="cliente"
           name="cliente"
           value={formData.cliente}
           onChange={handleInputChange}
         />
       </div>
       <div className='containerr1'>
         <label htmlFor="precio"><strong>Puntos acumulados</strong></label>
         <input
           className='inputt'
           type="text"
           id="puntos"
           name="puntos"
           value={formData.puntos}
           onChange={handleInputChange}
         />
       </div>
      <div className='containerr1'>
         <label htmlFor="name"><strong>Precio del producto:</strong></label>
         <input
           className='inputt'
           type="text"
           id="producto"
           name="producto"
           value={formData.producto}
           onChange={handleInputChange}
         />
       </div>
      <CircularProgressbarWithChildren value={porcentaje}> 
      <div className='responsivesis' style={{ fontSize: '80%', height: 'auto' }}>
          <strong>%{Math.min(porcentaje, 100)}</strong>
        </div>
      <img src="./chamarra.jpeg" style={{ width: '40%', height: '40%' }}/>
      </CircularProgressbarWithChildren>
      </div>
      <div className='h1responsives p-2 shadow rounded-md p-6 border border-dark-gray-200 space-y-6'>

      <p className='p'><strong>Cliente: </strong>{formData.cliente}</p>
      <p className='p'><strong>Precio: </strong>{formData.producto}</p>
      <p className='p'><strong>Puntos: </strong>{formData.puntos}</p>
      <p className='p'><strong>Dinero restante: </strong>{formData.producto-formData.puntos}</p>
      </div> 
                                                                                                                                                                                    
    </div>
  </div>
);
} 
export default VirtualKeyboard