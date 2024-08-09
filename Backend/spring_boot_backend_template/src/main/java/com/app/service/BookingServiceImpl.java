package com.app.service;

import com.app.dto.BookingDTO;
import com.app.dto.BookingResponseDTO;
import com.app.entity.*;
import com.app.dao.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private SeatDao seatDao;

    @Autowired
    private TrainDao trainDao;

    @Autowired
    private StationDao stationDao;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    
    @Override
    public BookingResponseDTO createBooking(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        booking.setBookingDate(bookingDTO.getBookingDate());

        Trains train = trainDao.findById(bookingDTO.getTrainId())
                .orElseThrow(() -> new RuntimeException("Train not found"));
        booking.setTrain(train);

        Station fromStation = stationDao.findById(bookingDTO.getFromStationId())
                .orElseThrow(() -> new RuntimeException("From Station not found"));
        booking.setFromStation(fromStation);

        Station toStation = stationDao.findById(bookingDTO.getToStationId())
                .orElseThrow(() -> new RuntimeException("To Station not found"));
        booking.setToStation(toStation);

        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        booking.setUser(user);

        
        List<BookingSeat> bookingSeats = new ArrayList<>();
        
        double totalPrice = 0.0;
      
        for (Long seatId : bookingDTO.getSeatIds()) {
            
            Seat seat = seatDao.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Seat not found"));

            
            BookingSeat bookingSeat = new BookingSeat();
            bookingSeat.setSeat(seat);
            bookingSeat.setBooking(booking); 

         
            bookingSeats.add(bookingSeat);
        }

       
        booking.setSeats(bookingSeats);

        int sequenceDifference = fromStation.getSequence() - toStation.getSequence();
        double seatPrice = Math.abs(sequenceDifference) * 10;
        totalPrice = seatPrice * bookingSeats.size(); 
        booking.setPrice(totalPrice);
        
        booking = bookingRepository.save(booking);

       
        return convertToResponseDTO(booking);
    }

    @Override
    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
        modelMapper.map(bookingDTO, booking);
        booking = bookingRepository.save(booking);
        return modelMapper.map(booking, BookingDTO.class);
    }

    @Override
    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
        return modelMapper.map(booking, BookingDTO.class);
    }

    @Override
    public List<BookingResponseDTO> getAllBookings() {
        return bookingDao.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    private BookingResponseDTO convertToResponseDTO(Booking booking) {
        BookingResponseDTO bookingResponseDTO = new BookingResponseDTO();
        bookingResponseDTO.setBookingId(booking.getId());
        bookingResponseDTO.setTrainId(booking.getTrain().getId());
        bookingResponseDTO.setTrainName(booking.getTrain().getName());
        bookingResponseDTO.setSourceStationName(booking.getFromStation().getName());
        bookingResponseDTO.setDestinationStationName(booking.getToStation().getName());
        bookingResponseDTO.setBookingDate(booking.getBookingDate());
        bookingResponseDTO.setPrice(booking.getPrice());
        
        List<Long> seatIds = booking.getSeats().stream()
                .map(bookingSeat -> bookingSeat.getSeat().getId())
                .collect(Collectors.toList());
        bookingResponseDTO.setSeatIds(seatIds);

        List<String> seatNumbers = booking.getSeats().stream()
                .map(bookingSeat -> bookingSeat.getSeat().getSeatNumber())
                .collect(Collectors.toList());
        bookingResponseDTO.setSeatNumbers(seatNumbers);

        bookingResponseDTO.setUserName(booking.getUser().getFirstName() + " " + booking.getUser().getLastName());
        return bookingResponseDTO;
    }
}
